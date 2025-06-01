<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Category } from '@commercetools/platform-sdk';
import { getCategories } from '../services/categories';

interface CategoryTree extends Category {
  children?: CategoryTree[];
}

const category = ref<string>('Category');
const categoriesTree = ref<CategoryTree[]>([]);

function buildCategoryTree(categories: Category[]): CategoryTree[] {
  const map = new Map<string, CategoryTree>();
  const roots: CategoryTree[] = [];

  categories.forEach(cat => {
    map.set(cat.id, { ...cat, children: [] });
  });

  map.forEach(cat => {
    if (cat.parent?.id && map.has(cat.parent.id)) {
      map.get(cat.parent.id)!.children!.push(cat);
    } else {
      roots.push(cat);
    }
  });

  function cleanEmptyChildren(nodes: CategoryTree[]) {
    nodes.forEach(n => {
      if (n.children && n.children.length === 0) {
        delete n.children;
      } else if (n.children) {
        cleanEmptyChildren(n.children);
      }
    });
  }
  cleanEmptyChildren(roots);

  return roots;
}

function choseCategpry(key: string | undefined, name: string) {
    console.log(key)
    category.value = name;
}

onMounted(async () => {
  const categories = await getCategories();
  categoriesTree.value = buildCategoryTree(categories);
  console.log(categoriesTree.value)
});

</script>

<template>
  <div class="text-center">
    <v-btn color="primary">
      {{ category }}

      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="(parent, ind) in categoriesTree" :key="ind" link @click="choseCategpry(parent.key, parent.name['en-US'])">
            <v-list-item-title>{{ parent.name['en-US'] }}</v-list-item-title>
            <template v-slot:append v-if="parent.children?.length">
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu v-if="parent.children?.length">
              <v-list>
                <v-list-item v-for="(elem, ind_2) in parent.children" :key="ind_2" link @click="choseCategpry(elem.key, elem.name['en-US'])">
                  <v-list-item-title>{{ elem.name['en-US'] }}</v-list-item-title>
                  <template v-slot:append v-if="elem.children?.length">
                    <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                  </template>

                  <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu v-if="elem.children?.length">
                    <v-list>
                      <v-list-item v-for="(item, ind_3) in elem.children" :key="ind_3" link @click="choseCategpry(item.key, item.name['en-US'])">
                        <v-list-item-title>{{ item.name['en-US']}}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>