<script setup lang="ts">
import type { Category } from '@/types/categories';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

const editData = (id: number) => emit('edit', id);
const deleteData = (id: number) => emit('delete', id);
</script>

<template>
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="category in props.categories" :key="category.id">
          <TableCell>{{ category.id }}</TableCell>
          <TableCell class="font-medium">{{ category.name }}</TableCell>
          <TableCell class="text-right space-x-2">
            <Button size="sm" variant="default" @click="editData(category.id)">
              Edit
            </Button>
            <Button size="sm" variant="destructive" @click="deleteData(category.id)">
              Delete
            </Button>
          </TableCell>
        </TableRow>

        <TableRow v-if="!props.categories.length">
          <TableCell colspan="3" class="text-center text-sm text-gray-500">
            No categories found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
