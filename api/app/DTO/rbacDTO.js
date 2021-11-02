// import Permission from '../Permission';
// import _ from 'lodash';

// export const permissionsDTO = (permissions) => {

//     const permissionsDTO = permissions.map(permission => ({
//         name: permission.permissions.name
//     }))

//     return permissionsDTO;
    
// }

// export const rolesDTO = (roles) => {

//     const rolesDTO = roles.map(role => ({
//         id: role.id,
//         name: role.name
//     }))

//     return rolesDTO;
    
// }


// export const rolePermissionsDTO = (rolePermissions) => {

//     const rolePermissionsDTO = rolePermissions.map(rolePermission => ({
//         roleId: rolePermission.roleid,
//         name: rolePermission.permissions.name
//     }))

//     return rolePermissionsDTO;
    
// }

// export const getPermissionsByRole = (rolePermissions) => {

//     const rolePermissionsDTO = _.groupBy(rolePermissions, "roleId");

//     return rolePermissionsDTO;
    
// }