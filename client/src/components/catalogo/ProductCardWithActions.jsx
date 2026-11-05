import { useAuth } from "../../context/useAuth.js";
import ProductAdminActions from "./ProductAdminActions.jsx";
import ProductCard from "../ProductCard.jsx";

function ProductCardWithActions({ producto, onSelect, onProductDeleted, ...cardProps }) {
  const { isAdmin } = useAuth();
  const name = producto.nombre || producto.name;

  return (
    <div className="flex h-full min-w-0 flex-col gap-3">
      <ProductCard
        producto={producto}
        onSelect={onSelect}
        {...cardProps}
      />
      {isAdmin && (
        <ProductAdminActions
          id={producto.id}
          name={name}
          onDeleted={onProductDeleted}
        />
      )}
    </div>
  );
}

export default ProductCardWithActions;
