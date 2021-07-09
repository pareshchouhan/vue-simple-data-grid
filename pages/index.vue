<template>
  <div>
    <app-data-grid :columns="columns" :items="items">
      <template slot="item.roles" slot-scope="{ item, column }">
        <span :style="{color: entry.textColor, background: entry.bgColor}" v-for="(entry, index) of item[column.key]" :key="entry.key + '-' + index"  class="mx-2 chips">{{entry.key}}</span>
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
        roles: [{ key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7', }, { key: 'wow', bgColor: 'rgba(95, 203, 177, .2)', textColor: '#5fcbb1', }]
      }, {
        id: 2,
        username: 'rahul',
        emailId: 'rahul@gmail.com',
        roles: [ { key: 'wow', bgColor: 'rgba(95, 203, 177, .2)', textColor: '#5fcbb1' }, { key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7' }, { key: 'viewer', bgColor: 'rgba(50, 110, 236,0.21)', textColor: '#326eec' }]
      }, {
        id: 3,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7' }]
      }, {
        id: 4,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7' }]
      }, {
        id: 5,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7' }]

      }, {
        id: 6,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7' }]

      }, {
        id: 7,
        username: 'aish',
        emailId: 'aish@gmail.com',
        roles: [{ key: 'admin', bgColor: 'rgba(146,103,247,0.21)', textColor: '#9267f7' }]

      }]
    };
  },
  components: {
    AppDataGrid
  }
}
</script>
<style lang="scss">
.big-text {
  font-size: 24px;
  margin-right: 10px;
}
.selected-count {
  text-decoration: underline;
}
.text-div {
  margin-bottom: 10px;
}
.chips {
  border-radius: 4px;
  font-weight: 500;
  padding: 0 10px;
}
</style>
