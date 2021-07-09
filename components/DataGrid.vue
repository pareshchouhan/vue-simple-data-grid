<template>
  <div class="r-data-grid">
    <div class='text-div'>
      <span class='big-text'>Users</span> <span class='selected-count'>{{selectedItemsCount}} selected</span> out of {{this.items.length}}
    </div>
    <table class="r-data-grid-table">
      <thead>
        <tr>
          <th v-if="allowSelection">
            <v-simple-checkbox @input="toggleSelectAll()" :value="isAllSelected">

            </v-simple-checkbox>
          </th>
          <th v-for="column of columns" :key="column.key" @click.prevent.stop="sortColumn(column)">
            {{column.name}} <span class="ml-auto" v-if="sorting.key && sorting.key === column.key"><v-icon>{{sorting.order === 'ASC' ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) of items" :key="item.id">
          <td v-if="allowSelection && selections.length > 0" class="text-center">
            <v-simple-checkbox v-model="selections[rowIndex]" @input="onSelectionChange($event, item)">
            </v-simple-checkbox>
          </td>
          <td v-for="(column, columnIndex) of columns" :key="column.key" :class="{ 'selected-cell': rowIndex === selectedCell.x && columnIndex === selectedCell.y }" :ref="rowIndex === selectedCell.x && columnIndex === selectedCell.y ? 'selectedCell' : null">
            <template v-if="typeof item[column.key] === 'number' || typeof item[column.key] === 'string'">
              {{item[column.key]}}
            </template>
            <template v-if="typeof item[column.key] === 'object'">
              <slot class='slot' :name="'item.' + column.key" v-bind:item="item" v-bind:column="column">
              </slot>
            </template>
            <template v-if="column.key === 'actions'">
              <v-btn text depressed fab v-for="action of column.actions" :key="action.icon" @click.stop="onClickAction(item, action)">
                <v-icon>{{action.icon}}</v-icon>
              </v-btn>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortFn } from '~/utils/sortingFn';
export default {
  props: {
    columns: [],
    items: [],
    colors: {}
  },
  data() {
    return {
      sorting: {
        key: null,
        order: 'ASC'
      },
      selections: [],
      allowSelection: true,
      isAllSelected: false,
      selectedCell: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    // processedItems() {
    //   if (this.sorting.key) {
    //     updatedItems.sort
    //   }
    //   return updatedItems;
    // }
    selectedItemsCount() {
      return this.selections.reduce((totalSelected, current) => current ? totalSelected + 1 : totalSelected, 0);
    }
  },
  methods: {
    sortColumn(column) {
      if (column.sortable) {
        console.log('sorting on ', column.key, this.sorting.order)
        if (this.sorting.order === 'ASC') {
          this.items = this.items.sort((a, b) => sortFn(a[column.key], b[column.key]));
          this.sorting.order = 'DESC'
        } else {
          this.sorting.order = 'ASC'
          this.items = this.items.sort((a, b) => sortFn(b[column.key], a[column.key]));
        }
        this.sorting.key = column.key; // column key to which sort on. (saving so that it may be used later.)
      }
    },
    toggleSelectAll() {
      this.selections = this.selections.map(selection => !this.isAllSelected);
      this.isAllSelected = !this.isAllSelected;
    },
    onSelectionChange(event, item) {
      if (event === false) {
        this.isAllSelected = false
      } else {
        if (!this.selections.some(selection => selection === false)) {
          this.isAllSelected = true
        }
      }
    },
    onClickAction(item, action) {
      if (typeof action.onClick === 'function') action.onClick(item);
    },
    moveSelection(direction) {
      if (direction === 'ArrowLeft') {
        this.selectedCell.y = Math.max(this.selectedCell.y - 1, 0)
      } else if (direction === 'ArrowRight') {
        this.selectedCell.y = Math.min(this.selectedCell.y + 1, this.columns.length - 1)
      } else if (direction === 'ArrowUp')  {
        this.selectedCell.x = Math.max(this.selectedCell.x - 1, 0)
      } else if (direction === 'ArrowDown') { // bottom
        this.selectedCell.x = Math.min(this.selectedCell.x + 1, this.items.length - 1)
      }
      this.$nextTick(() => {
        console.log(this.$refs);
        this.$refs.selectedCell[0].scrollIntoView(false, {
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          })
        // this.$refs.selectedCell.scrollIntoView();
      });
    }
  },
  // watch: {
  //   items: function(newVal, oldVal) { // watch it
  //     // go through each column, figure out
  //   }
  // },
  mounted() {
    document.addEventListener('keydown', (e) => {
      this.moveSelection(e.key);
    });
    if (this.items) {
      this.selections = this.items.map(item => false);
    }
  },
  unmounted() {

  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box !important;
}
.position-relative {
  position: relative !important;
}
.position-absolute {
  position: absolute !important;
}

.r-data-grid {
  overflow-y: auto;
  table {
    background: #fff;
    border: 2px solid #f2f2f2;
    border-collapse: collapse;
    width: 100%;
  }
  th {
    text-align: left;
    background: #f2f2f2;
    font-size: 16px;
    color: #999;
    padding: 10px 0;
    height: 40px;
    position: sticky;
    top: 0;  /* REQUIRED: https://stackoverflow.com/a/43707215 */
    z-index: 10;
    resize: horizontal;
    overflow: auto;
    padding: 8px;
  }

  th, td {
    padding: 6px 14px;
    border: 1px solid #ccc;
    // text-align: center;
    font-size: 15px;
  }
  td {
    color: #666;
  }
  th {
    // padding: 0px 0px;
  }
  tr:nth-child(even) {
    // background-color: #f2f2f2;
  }
  .r-resize-block {
    // border-right: 2px solid #232323;
    height: 30px;
    display: inline-block;
    // right: 0;
    // margin-left: 10px;
  }
  .selected-cell {
    border: 2px solid blue;
  }
  .slot {
    background: #5fcbb1;
  }

}
.v-btn--fab.v-size--default {
  width: 37px;
  height: 37px;
  i {
    font-size: 20px !important;
    color: #666 !important;
  }
}
</style>
