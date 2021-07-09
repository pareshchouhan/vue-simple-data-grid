<template>
  <div>
    <app-data-grid :columns="columns" :items="items">
      <template slot="item.roles" slot-scope="{ item, column }">
        <v-chip v-for="(entry, index) of item[column.key]" :key="entry.key + '-' + index" :color="entry.color" dark class="mx-2">{{entry.key}}</v-chip>
      </template>
    </app-data-grid>
  </div>
</template>

<script>
import AppDataGrid from '~/components/DataGrid'
export default {
  data() {
    return {
      columns: [{
        key: 'id',
        name: 'id',
        sortable: true
      }, {
        key: 'username',
        name: 'Name',
        sortable: true
      }, {
        key: 'emailId',
        name: 'Email',
        sortable: true
      }, {
        key: 'roles',
        name: 'Roles'
      }, {
        key: 'actions',
        name: 'Actions',
        actions: [{
          onClick: (item) => {
            console.log('edit', item)

            // do API call and remove from this.items
          },
          icon: 'mdi-pencil-outline'
        }, {
          onClick: (item) => {
            console.log('view', item)
          },
          icon: 'mdi-eye-outline'
        }, {
          onClick: (item) => {
            console.log('delete', item)
            // do API call and remove from this.items
            this.items = this.items.filter(_item => _item.id !== item.id);
          },
          icon: 'mdi-trash-can-outline'
        }]
      }],
      items: [{
        id: 1,
        username: 'paresh',
        emailId: 'paresh@gmail.com',
        roles: [{ key: 'admin', color: 'red' }, { key: 'wow', color: 'green' }]
      }, {
        id: 2,
        username: 'rahul',
        emailId: 'rahul@gmail.com',
        roles: [ { key: 'wow', color: 'green' }, { key: 'admin', color: 'red' }]
      }, {
        id: 3,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', color: 'red' }]
      }, {
        id: 4,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', color: 'red' }]
      }, {
        id: 5,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', color: 'red' }]
      }, {
        id: 6,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', color: 'red' }]
      }, {
        id: 7,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', color: 'red' }]
      }]
    };
  },
  components: {
    AppDataGrid
  }
}
</script>