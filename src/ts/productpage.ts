import { cartBadge, filterProducts, showProducts } from "./functions/functions";

import { products as filteredList } from "./services.ts/data";

showProducts(filteredList);
filterProducts();
cartBadge();
