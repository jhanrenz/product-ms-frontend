<script setup lang="ts">
import type { ProductForm as Product } from '@/types/products';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const props = defineProps<{
  products: Product[];
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
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="product in props.products" :key="product.id">
          <TableCell>{{ product.id }}</TableCell>

          <TableCell class="font-medium">
            <div class="flex items-center space-x-2">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                alt="Product Image"
                class="w-10 h-10 rounded-md object-cover"
              />
              <div v-else class="w-10 h-10 flex items-center justify-center bg-muted rounded-md text-xs text-muted-foreground">
                No Image
              </div>
              <span>{{ product.name }}</span>
            </div>
          </TableCell>

          <TableCell>
            <Badge variant="secondary">
              {{ product.category?.name || 'Uncategorized' }}
            </Badge>
          </TableCell>

          <TableCell>PHP {{ product.price }}</TableCell>

          <TableCell class="text-right space-x-2">
            <Button size="sm" variant="default" @click="editData(product.id)">
              Edit
            </Button>
            <Button size="sm" variant="destructive" @click="deleteData(product.id)">
              Delete
            </Button>
          </TableCell>
        </TableRow>
        <TableRow v-if="!props.products.length">
          <TableCell colspan="5" class="text-center text-sm text-muted-foreground">
            No products found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
