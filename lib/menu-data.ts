import type { FeaturedDish, MenuCategoryInfo } from "@/types";
import { images } from "@/lib/images";

/**
 * La carta completa de La Guayaba.
 * Precios en pesos colombianos (COP). Edita libremente: la página /menu y la
 * vista previa del inicio se generan a partir de estos datos.
 */

export const menuCategories: MenuCategoryInfo[] = [
  {
    id: "para-compartir",
    name: "Para compartir",
    description: "Entradas generosas para empezar en familia.",
  },
  {
    id: "platos-tipicos",
    name: "Platos típicos",
    description: "El corazón de la cocina antioqueña y colombiana.",
  },
  {
    id: "parrilla",
    name: "Parrilla",
    description: "Cortes al carbón, dorados y jugosos.",
  },
  {
    id: "pescados",
    name: "Pescados",
    description: "Del mar y del río a tu mesa.",
  },
  {
    id: "otros-antojos",
    name: "Otros antojos",
    description: "Para cuando el hambre pide algo distinto.",
  },
  {
    id: "menu-infantil",
    name: "Menú infantil",
    description: "Porciones pensadas para los más pequeños.",
  },
  {
    id: "postres",
    name: "Postres",
    description: "El dulce final de toda buena historia.",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Jugos naturales, gaseosas y refrescos de la casa.",
  },
  {
    id: "licores",
    name: "Licores",
    description: "Aguardiente, ron, whisky y más.",
  },
  {
    id: "cocteles",
    name: "Cócteles",
    description: "Preparaciones de autor con sabor tropical.",
  },
  {
    id: "cervezas",
    name: "Cervezas",
    description: "Nacionales bien frías e importadas.",
  },
  {
    id: "adiciones",
    name: "Adiciones",
    description: "Complementa tu plato a tu gusto.",
  },
];


/** Platos insignia destacados en la página de inicio (Especialidades). */
export const featuredDishes: FeaturedDish[] = [
  {
    id: "bandeja-paisa",
    name: "Bandeja paisa",
    description:
      "Nuestro plato bandera: abundante, generoso y hecho como en casa, con todos los sabores de la montaña.",
    image: images.bandejaPaisa,
    tag: "La reina de la casa",
  },
  {
    id: "cazuela-frijoles",
    name: "Cazuela de frijoles",
    description:
      "Frijoles espesos servidos en cazuela de barro, tal como los preparaba la familia en 1999.",
    image: images.cazuela,
    tag: "Tradición paisa",
  },
  {
    id: "posta-cartagenera",
    name: "Posta cartagenera",
    description:
      "Muchacho de res cocido lentamente en salsa criolla dulce, con arroz de coco de la costa.",
    image: images.postaCartagenera,
    tag: "Sabor del Caribe",
  },
  {
    id: "costillas-bbq-guayaba",
    name: "Costillas BBQ de guayaba",
    description:
      "Costillas glaseadas en nuestra salsa BBQ de guayaba, el ingrediente que nos da el nombre.",
    image: images.costillasBbq,
    tag: "Receta de autor",
  },
  {
    id: "salmon-gratinado",
    name: "Salmón gratinado",
    description:
      "Un clásico moderno: lomo de salmón con costra de hierbas y vegetales salteados.",
    image: images.salmonGratinado,
    tag: "Del mar",
  },
];
