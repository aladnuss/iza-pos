import React from 'react';
import CategoryFormPanel from './CategoryFormPanel';
import ItemFormPanel from './ItemFormPanel';

interface CategoryFormProps {
  type: 'category';
  initialData?: { name: string; description: string };
  onSave: (data: { name: string; description: string }) => void;
  onCancel?: () => void;
  onReset?: () => void;
  onDeleteCategory?: () => void;
}

interface ItemFormProps {
  type: 'item';
  initialData?: { name: string; description: string; price: number; itemId: string; photo?: string; variants?: any[] };
  onSave: (data: { name: string; description: string; price: number; itemId: string; photo?: string; variants?: any[] }) => void;
  onCancel?: () => void;
  onDeleteItem?: () => void;
  onShowVariantTable?: () => void;
}

type ProductFormPanelProps = CategoryFormProps | ItemFormProps;

const ProductFormPanel: React.FC<ProductFormPanelProps> = (props) => (
  <>
    <div style={{ display: props.type === 'category' ? 'block' : 'none' }}>
      <CategoryFormPanel
        initialData={props.type === 'category' ? props.initialData : undefined}
        onSave={props.onSave}
        {...(props.type === 'category' && props.onReset ? { onReset: props.onReset } : {})}
        {...(props.type === 'category' && props.onDeleteCategory ? { onDeleteCategory: props.onDeleteCategory } : {})}
      />
    </div>
    <div style={{ display: props.type === 'item' ? 'block' : 'none' }}>
      <ItemFormPanel
        initialData={props.type === 'item' ? props.initialData : undefined}
        onSave={props.onSave}
        onCancel={props.onCancel}
        {...(props.type === 'item' && props.onDeleteItem ? { onDeleteItem: props.onDeleteItem } : {})}
        {...(props.type === 'item' && props.onShowVariantTable ? { onShowVariantTable: props.onShowVariantTable } : {})}
      />
    </div>
  </>
);

export default ProductFormPanel; 