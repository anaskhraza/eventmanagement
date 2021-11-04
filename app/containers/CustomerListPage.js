import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import {
  DatePicker,
  Button,
  Card,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Icon,
  Modal,
  Alert,
  Switch,
  Menu,
  Dropdown
} from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SpinnerComponent } from "../utils/common";
import { fetchCustomers } from "../actions/customers";
import { ColumnDropDown, ColumnButtonDraft } from "../components/Common";
import { TouchBarScrubber } from "electron";
import OrderListPage from "../containers/OrderListPage";

class CustomerLListPage extends Component {
  constructor(props) {
    super();
    this.state = {
      searchText: "",
      selectedCustomerId: "",
      showCustomerPage: true,
      showOrderPage: false
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      if (record[dataIndex]) {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      } else {
        return null;
      }
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : null}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    let itemsPromise = this.props.fetchCustomers();
  }

  handleClick = (record, e) => {
    //console.log("Rec -> ", record);
    const key = e.target ? e.target.id : e.key;
    //console.log("key -> ", key);

    switch (key) {
      case "edit": {
        // this.props.prepareUpdateEvent(record);
        break;
      }
      default: {
        break;
      }
    }
  };

  deleteDraft = (record, e) => {
    //console.log("record -> ", record);
    //console.log("e -> ", e);

    const draftId = record.id;

    this.props.deleteDraft(draftId, true);
  };

  render() {
    let OrderCard = null;
    const columns = [
      {
        title: "Customer Name",
        dataIndex: "customer_name",
        width: "20%",
        ...this.getColumnSearchProps("customer_name")
      },
      {
        title: "Cell Number",
        dataIndex: "customer_number",
        width: "20%",
        ...this.getColumnSearchProps("customer_number")
      },
      {
        title: "Alternate Number",
        dataIndex: "alternate_number",
        width: "20%",
        ...this.getColumnSearchProps("alternate_number")
      },
      {
        title: "Customer Address",
        dataIndex: "customer_address",
        width: "15%"
      },
      {
        title: "Order Count",
        dataIndex: "order_customer_id.countTask",
        width: "10%"
      },
      {
        title: "Show Orders",
        key: "seestats",
        width: "15%",
        render: (text, record) => (
          <Button
            type="danger"
            onClick={e =>
              this.setState({
                selectedCustomerId: record.id,
                showOrderPage: true,
                showCustomerPage: false
              })
            }
          >
            Show Orders
          </Button>
        )
      }
    ];
    const itemCount = this.props.itemData ? this.props.itemData.length : 0;
    const count = `Customer Count: ${itemCount}`;
    // if (this.state.selectedCustomerId) {
    //   OrderCard = (

    //   );
    // }
    console.log("customer Id ", this.state.selectedCustomerId);
    return (
      <Fragment>
        <div
          style={{
            width: "auto",
            maxHeight: "100%",
            overflowY: "auto",
            position: "absolute"
          }}
        >
          <Card
            title="Customer List"
            extra={count}
            hidden={!this.state.showCustomerPage}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 1200,
              textAlign: "center",
              alignContent: "center"
            }}
          >
            <Table
              columns={columns}
              dataSource={this.props.itemData}
              loading={this.props.fetching}
              scroll={{ y: 400 }}
            />
          </Card>
          {this.state.selectedCustomerId && this.state.showOrderPage ? (
            <Fragment>
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 1200,
                  textAlign: "center",
                  alignContent: "center",
                  paddingBottom: 20
                }}
              >
                <Button
                  type="danger"
                  onClick={() =>
                    this.setState({
                      showOrderPage: false,
                      showCustomerPage: true
                    })
                  }
                  size="large"
                  style={{
                    width: 200,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  Back
                </Button>
              </div>
              <OrderListPage customerListId={this.state.selectedCustomerId} />
            </Fragment>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  //console.log("here Create Event Page", state);
  return {
    itemData: state.customers ? state.customers.data : [],
    fetching: state.customers ? state.customers.fetching : fasle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCustomers: fetchCustomers
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLListPage);
