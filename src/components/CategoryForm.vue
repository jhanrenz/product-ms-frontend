<script setup lang="ts">
import type { Category } from '@/types/categories'
import { ref, onMounted, computed } from 'vue'
import { categoryStore } from '@/stores/category'
import { useRoute, useRouter } from 'vue-router'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const store = categoryStore()
const route = useRoute()
const router = useRouter()

const category_id = Number(route.params.id) || null
const isEditMode = computed(() => !!category_id)

const data = ref<Omit<Category, 'id'>>({
  name: ''
})

onMounted(() => {
  if (category_id) {
    const category = store.categories.find(
      (c) => c.id === category_id
    )
    if (category) {
      data.value = {
        name: category.name
      }
    }
  }
})

const submitData = () => {
  if (!confirm("Are you sure to save?")) return

  if (category_id) {
    store.updateCategory({ id: category_id, ...data.value })
  } else {
    store.addCategory(data.value)
  }

  router.push('/categories')
}
</script>


<template>
  <div class="min-h-screen bg-muted/40 py-12 px-6">
    <div class="max-w-md mx-auto">
      
      <Card>
        <CardHeader>
          <CardTitle>
            {{ isEditMode ? 'Edit Category' : 'Add New Category' }}
          </CardTitle>
          <CardDescription v-if="isEditMode">
            Update your category information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form @submit.prevent="submitData" class="space-y-6">

            <div class="space-y-2">
              <Label for="name">Category Name</Label>
              <Input
                id="name"
                v-model="data.name"
                type="text"
                placeholder="Enter category name"
                required
              />
            </div>

            <div class="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                @click="router.push('/categories')"
              >
                Cancel
              </Button>

              <Button type="submit">
                {{ isEditMode ? 'Update Category' : 'Save Category' }}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  </div>
</template>
