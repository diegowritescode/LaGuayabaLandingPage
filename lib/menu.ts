import { images } from "@/lib/images";

/**
 * CARTA DIGITAL de La Guayaba — fuente de la verdad (contenido real).
 *
 * Estructura: Categoría → Subcategoría → Platos.
 * Editar aquí actualiza el menú digital, el buscador y el JSON-LD (SEO).
 * Precios en pesos colombianos (COP). Un plato puede tener varios precios
 * con etiqueta (p. ej. Vaso / Jarra, Copa / Botella, Trago / Media / Botella).
 */

export type DishTag = "insignia" | "vegetariano";

export type MenuPrice = {
  /** Etiqueta opcional para precios múltiples (Vaso, Jarra, Botella…). */
  label?: string;
  value: number;
};

export type Dish = {
  name: string;
  description?: string;
  /** Nota corta, p. ej. "Martes y sábado". */
  note?: string;
  prices: MenuPrice[];
  tags?: DishTag[];
};

export type SubCategory = {
  id: string;
  name: string;
  /** Texto introductorio (p. ej. de qué vienen acompañados los platos). */
  note?: string;
  dishes: Dish[];
};

export type MenuCategory = {
  key: string;
  label: string;
  /** Etiqueta en líneas para la tarjeta de la landing. */
  labelLines: string[];
  cover: string;
  /** Slug para la ruta /menu/[slug] (URL amigable e indexable). */
  slug: string;
  /** Título SEO absoluto de la página de la categoría. */
  metaTitle: string;
  /** Meta description de la página de la categoría. */
  metaDescription: string;
  /** Frase introductoria (contexto para el usuario y para el SEO). */
  intro?: string;
  subcategories: SubCategory[];
};

export const menuData: MenuCategory[] = [
  {
    key: "comidas",
    label: "Comidas",
    labelLines: ["Comidas"],
    cover: images.menuCovers.comidas,
    slug: "comidas",
    metaTitle: "Comidas típicas colombianas en Medellín | La Guayaba",
    metaDescription:
      "Bandeja paisa, cazuela de frijoles, sancocho, parrilla al carbón, pescados y platos para compartir. La carta de comidas de La Guayaba en la Avenida Guayabal, Medellín.",
    intro:
      "Recetas antioqueñas y colombianas de siempre: desde la bandeja paisa y la cazuela de frijoles hasta la parrilla al carbón y los pescados del día.",
    subcategories: [
      {
        id: "para-compartir",
        name: "Para compartir",
        dishes: [
          {
            name: "Morcillas",
            description: "Morcillas tipo coctel acompañadas de arepita, hogao y cascos de limón.",
            prices: [{ value: 21000 }],
          },
          {
            name: "Paticas de chicharrón",
            description: "Crujientes trozos de chicharrón apanado, acompañados de arepita, patacones con hogao y limón.",
            prices: [{ value: 22000 }],
          },
          {
            name: "Mini pasteles de pollo",
            description: "Pastelitos de pollo acompañados de ají de la casa y hogao.",
            prices: [{ value: 15900 }],
          },
          {
            name: "Mini empanadas",
            description: "Empanaditas rellenas de papa, acompañadas de ají de la casa y hogao.",
            prices: [{ value: 13900 }],
            tags: ["vegetariano"],
          },
          {
            name: "Mini patacones",
            description: "Plátano verde frito con hogao.",
            prices: [{ value: 12900 }],
            tags: ["vegetariano"],
          },
          {
            name: "Ceviche de chicharrón",
            description: "Trozos de chicharrón, maíz tierno, cebolla y cilantro, acompañados de patacón y guacamole.",
            prices: [{ value: 22000 }],
          },
        ],
      },
      {
        id: "platos-tipicos",
        name: "Platos típicos",
        dishes: [
          {
            name: "Bandeja paisa La Guayaba",
            description: "Bandeja típica con frijoles montañeros, arroz, carne molida, huevo frito, chorizo, morcilla, maduro, chicharrón, arepita y ensalada de la casa.",
            prices: [{ value: 39000 }],
            tags: ["insignia"],
          },
          {
            name: "Cazuela de frijoles",
            description: "Frijoles montañeros con chicharrón picado, carne molida, maicitos, patacón y madurito, acompañado de arroz, ensalada y arepita.",
            prices: [{ value: 35000 }],
            tags: ["insignia"],
          },
          {
            name: "Mondongo especial",
            description: "Mondongo con papa, arvejas, zanahoria, carne de cerdo y cilantro, acompañado de arroz, arepita, banano y ensalada de la casa.",
            prices: [{ value: 32500 }],
          },
          {
            name: "Ajiaco",
            note: "Martes y sábado",
            description: "Sopa a base de papas con pollo desmechado, mazorca, acompañado de arroz, arepita, banano y ensalada de la casa.",
            prices: [{ value: 27900 }],
          },
          {
            name: "Posta sudada",
            description: "Posta cocinada a la criolla con yuca, papa guisada, arroz, maduro, arepita y ensalada.",
            prices: [{ value: 39000 }],
          },
          {
            name: "Posta cartagenera",
            description: "Posta en salsa de panela y Coca-Cola, con arroz con coco, patacón y guacamole casero.",
            prices: [{ value: 45000 }],
            tags: ["insignia"],
          },
          {
            name: "Frijol verde con pezuña",
            note: "Sábado",
            description: "Frijoles verdes con pezuña de cerdo, acompañados de arroz, ensalada, patacón y chicharrón.",
            prices: [{ value: 28000 }],
          },
          {
            name: "Sancocho de morrillo",
            note: "Domingo",
            description: "Sancocho acompañado de arroz, arepita y ensalada.",
            prices: [{ value: 35000 }],
          },
          {
            name: "Bandeja antioqueña",
            description: "Frijoles montañeros, arroz, huevo frito, plátano maduro, cascos de papa, arepita y ensalada de la casa. Elige tu proteína: chicharrón, pechuga de pollo, carne de res, carne de cerdo o carne molida.",
            prices: [{ value: 28500 }],
          },
          {
            name: "Bandeja vegetariana",
            description: "Frijoles montañeros, arroz, plátano maduro, cascos de papa, arepita y ensalada de la casa. Elige tu proteína: proteína molida a base de lentejas o chorizo a base de soya.",
            prices: [{ value: 28500 }],
            tags: ["vegetariano"],
          },
        ],
      },
      {
        id: "parrilla",
        name: "Parrilla",
        note: "Acompañados de ensalada de la casa, arepita y una guarnición a elección: papa al vapor, papa a la francesa, papa criolla o papa casco.",
        dishes: [
          { name: "Solomito", description: "Solomito a la parrilla y chimichurri.", prices: [{ value: 52000 }] },
          { name: "Churrasco", description: "Churrasco a la parrilla y chimichurri.", prices: [{ value: 43000 }] },
          { name: "Punta de anca", description: "Punta de anca de res y chimichurri.", prices: [{ value: 43000 }] },
          {
            name: "Costillas de cerdo",
            description: "Costilla de cerdo artesanal ahumada, con BBQ de guayaba.",
            prices: [{ value: 50000 }],
            tags: ["insignia"],
          },
          { name: "Cañón de cerdo", description: "Corte de cañón a la parrilla y chimichurri.", prices: [{ value: 36000 }] },
          {
            name: "Cañón de cerdo con champiñones",
            description: "Cañón de cerdo con salsa cremosa de champiñones.",
            prices: [{ value: 38000 }],
          },
          {
            name: "Chicharrón La Guayaba",
            description: "Chicharrón crujiente, acompañado de patacones con hogao.",
            prices: [{ value: 35000 }],
            tags: ["insignia"],
          },
          { name: "Pechuga de pollo", description: "Pechuga de pollo a la parrilla.", prices: [{ value: 32000 }] },
          {
            name: "Pechuga de pollo con champiñones",
            description: "Filete de pechuga asada a la parrilla, bañada en salsa cremosa de champiñones.",
            prices: [{ value: 36000 }],
          },
          {
            name: "Pollo gratinado",
            description: "Filete de pechuga asada a la parrilla con salsa bechamel y queso mozzarella fundido al horno.",
            prices: [{ value: 38000 }],
          },
          { name: "Chuzo de pollo", description: "Chuzo de pollo a la parrilla con lonjas de tocineta.", prices: [{ value: 26000 }] },
          {
            name: "Picada para compartir",
            description: "Chorizo campesino, pechuga de pollo, paticas de chicharrón, morcilla, arepitas, papa (criolla, francesa o casco), patacones, guacamole, hogao y limón.",
            prices: [
              { label: "Personal", value: 50000 },
              { label: "Para compartir", value: 94900 },
            ],
            tags: ["insignia"],
          },
        ],
      },
      {
        id: "pescados",
        name: "Pescados",
        note: "Acompañados de arroz con coco, ensalada de la casa y patacón.",
        dishes: [
          {
            name: "Salmón gratinado",
            description: "Salmón con camarones gratinado en mozzarella y parmesano.",
            prices: [{ value: 52000 }],
            tags: ["insignia"],
          },
          { name: "Salmón al ajillo", description: "Salmón con salsa de ajo y mantequilla.", prices: [{ value: 45000 }] },
          { name: "Tilapia", description: "Pescado frito.", prices: [{ value: 40000 }] },
          {
            name: "Trucha al ajillo",
            description: "Trucha asada a la plancha, bañada en mantequilla de ajo.",
            prices: [{ value: 35000 }],
          },
        ],
      },
      {
        id: "otros-antojos",
        name: "Otros antojos",
        dishes: [
          {
            name: "Patacones",
            description: "Acompañados de papa francesa y huevo de codorniz.",
            prices: [
              { label: "Con camarones", value: 32000 },
              { label: "Con pollo desmechado", value: 24000 },
              { label: "Con carne desmechada", value: 26000 },
            ],
          },
          {
            name: "Salchipapa especial",
            description: "Papas a la francesa con trozos de salchicha, carne desmechada, queso mozzarella y huevitos de codorniz.",
            prices: [{ value: 25000 }],
          },
          {
            name: "Hamburguesa especial",
            description: "Carne de hamburguesa, pechuga de pollo, tocineta, queso mozzarella, lechuga, tomate, cebolla y huevo de codorniz, acompañada de papa a la francesa.",
            prices: [{ value: 29900 }],
          },
          {
            name: "Ensalada La Guayaba",
            description: "Mix de lechugas, tomate, tocineta crocante, filete de pechuga, crutones, queso mozzarella y queso parmesano.",
            prices: [{ value: 25000 }],
            tags: ["insignia"],
          },
        ],
      },
      {
        id: "menu-infantil",
        name: "Menú infantil",
        dishes: [
          {
            name: "Menú infantil",
            description: "Dos pinchos de pollo, yuca frita crujiente, arepita gratinada, papa a la francesa y huevo de codorniz. Postre: 1 bola de helado. Incluye bebida en caja HIT y detalle sorpresa.",
            prices: [{ value: 25000 }],
          },
        ],
      },
      {
        id: "adiciones",
        name: "Adiciones",
        dishes: [
          { name: "Sopa de ajiaco", prices: [{ value: 14000 }] },
          { name: "Porción de frijol", prices: [{ value: 11000 }], tags: ["vegetariano"] },
          { name: "Sopa del día", prices: [{ value: 11000 }] },
          { name: "Crema del día", prices: [{ value: 10000 }] },
          { name: "Carne de res", prices: [{ value: 12000 }] },
          {
            name: "Proteínas",
            description: "Chicharrón, cerdo, carne molida, carne desmechada o pechuga de pollo.",
            prices: [{ value: 10000 }],
          },
        ],
      },
      {
        id: "postres",
        name: "Postres",
        dishes: [
          { name: "Tres leches", prices: [{ value: 17500 }], tags: ["vegetariano"] },
          { name: "Brownie con helado", prices: [{ value: 15000 }], tags: ["vegetariano"] },
          { name: "Copa de helado", prices: [{ value: 6000 }], tags: ["vegetariano"] },
          { name: "Frasco de postre", prices: [{ value: 10000 }], tags: ["vegetariano"] },
          {
            name: "Cheesecake de guayaba con helado",
            prices: [{ value: 17500 }],
            tags: ["insignia", "vegetariano"],
          },
        ],
      },
    ],
  },
  {
    key: "sin-licor",
    label: "Bebidas sin licor",
    labelLines: ["Bebidas", "sin licor"],
    cover: images.menuCovers.sinLicor,
    slug: "bebidas-sin-licor",
    metaTitle: "Bebidas sin licor: jugos naturales y limonadas | La Guayaba",
    metaDescription:
      "Jugos naturales de fruta, limonadas de la casa, sodas y refrescos para acompañar tu comida en La Guayaba, Medellín.",
    intro:
      "Jugos naturales de fruta, limonadas de la casa, sodas y refrescos para acompañar cada plato.",
    subcategories: [
      {
        id: "naturales",
        name: "Bebidas naturales",
        dishes: [
          { name: "Mazamorra", prices: [{ value: 7000 }], tags: ["vegetariano"] },
          { name: "Claro", prices: [{ value: 5000 }], tags: ["vegetariano"] },
          {
            name: "Jugos en agua",
            description: "Guanábana, maracuyá, mora, fresa o mango.",
            prices: [{ value: 9000 }],
            tags: ["vegetariano"],
          },
          {
            name: "Jugos en leche",
            description: "Tu fruta favorita preparada en leche.",
            prices: [{ value: 10000 }],
            tags: ["vegetariano"],
          },
          {
            name: "Limonada natural",
            prices: [
              { label: "Vaso", value: 8500 },
              { label: "Jarra", value: 20000 },
            ],
            tags: ["vegetariano"],
          },
          {
            name: "Limonada de yerbabuena",
            prices: [
              { label: "Vaso", value: 8500 },
              { label: "Jarra", value: 20000 },
            ],
            tags: ["vegetariano"],
          },
          {
            name: "Limonada de coco",
            prices: [
              { label: "Vaso", value: 11000 },
              { label: "Jarra", value: 26000 },
            ],
            tags: ["vegetariano"],
          },
          {
            name: "Limonada cerezada",
            prices: [
              { label: "Vaso", value: 11000 },
              { label: "Jarra", value: 26000 },
            ],
            tags: ["vegetariano"],
          },
          {
            name: "Limonada de mango biche",
            prices: [
              { label: "Vaso", value: 11000 },
              { label: "Jarra", value: 26000 },
            ],
            tags: ["vegetariano"],
          },
        ],
      },
      {
        id: "sodas",
        name: "Sodas",
        dishes: [
          { name: "Soda", prices: [{ value: 5000 }], tags: ["vegetariano"] },
          { name: "Soda michelada", prices: [{ value: 7000 }], tags: ["vegetariano"] },
          { name: "Soda de frutos rojos", prices: [{ value: 13000 }], tags: ["vegetariano"] },
          { name: "Soda de maracuyá", prices: [{ value: 13000 }], tags: ["vegetariano"] },
          { name: "Soda de lychees", prices: [{ value: 13000 }], tags: ["vegetariano"] },
          { name: "Soda de mango biche", prices: [{ value: 13000 }], tags: ["vegetariano"] },
        ],
      },
      {
        id: "embotelladas",
        name: "Bebidas embotelladas",
        dishes: [
          { name: "Gaseosa 350 ml", prices: [{ value: 5000 }] },
          { name: "H2O Limón", prices: [{ value: 6000 }] },
          { name: "Agua con gas", prices: [{ value: 5000 }] },
          { name: "Agua sin gas", prices: [{ value: 4000 }] },
        ],
      },
    ],
  },
  {
    key: "con-licor",
    label: "Bebidas con licor",
    labelLines: ["Bebidas", "con licor"],
    cover: images.menuCovers.conLicor,
    slug: "bebidas-con-licor",
    metaTitle: "Bar: cócteles, sangría, licores y cervezas | La Guayaba",
    metaDescription:
      "Cócteles de autor, sangría, refajos, vinos, licores y cervezas bien frías en el bar de La Guayaba, Avenida Guayabal, Medellín.",
    intro:
      "El bar de La Guayaba: sangría, refajos y vinos, cócteles de autor, licores y cervezas bien frías.",
    subcategories: [
      {
        id: "sangria-vinos",
        name: "Sangría, refajos y vinos",
        dishes: [
          {
            name: "Sangría de vino tinto",
            description: "Vino tinto, brandy, triple sec y mix de frutas.",
            prices: [
              { label: "Copa", value: 25000 },
              { label: "Jarra", value: 85000 },
            ],
            tags: ["insignia"],
          },
          { name: "Refajo sencillo", prices: [{ label: "Jarra", value: 30000 }] },
          {
            name: "Refajo especial",
            description: "Vodka, gotas amargas y naranja.",
            prices: [{ label: "Jarra", value: 39000 }],
          },
          {
            name: "Vino tinto",
            prices: [
              { label: "Copa", value: 20000 },
              { label: "Botella", value: 55000 },
            ],
          },
          {
            name: "Vino blanco",
            prices: [
              { label: "Copa", value: 20000 },
              { label: "Botella", value: 55000 },
            ],
          },
          {
            name: "Tinto de verano",
            description: "Vino tinto, mix de frutas y agua.",
            prices: [{ label: "Copa", value: 22000 }],
          },
          {
            name: "Vino caliente",
            description: "Vino tinto, jugo cítrico, canela y syrope.",
            prices: [{ label: "Copa", value: 24000 }],
          },
        ],
      },
      {
        id: "licores",
        name: "Licores",
        dishes: [
          {
            name: "Buchanan's",
            prices: [
              { label: "Trago", value: 30000 },
              { label: "Media", value: 200000 },
              { label: "Botella", value: 350000 },
            ],
          },
          {
            name: "Ron Medellín",
            prices: [
              { label: "Trago", value: 12000 },
              { label: "Media", value: 65000 },
              { label: "Botella", value: 120000 },
            ],
          },
          {
            name: "Ron Viejo de Caldas",
            prices: [
              { label: "Trago", value: 14000 },
              { label: "Media", value: 70000 },
              { label: "Botella", value: 130000 },
            ],
          },
          {
            name: "Aguardiente Antioqueño",
            description: "Azul, rojo o verde.",
            prices: [
              { label: "Trago", value: 11000 },
              { label: "Media", value: 60000 },
              { label: "Botella", value: 110000 },
            ],
          },
          {
            name: "Baileys",
            prices: [
              { label: "Trago", value: 20000 },
              { label: "Media", value: 120000 },
              { label: "Botella", value: 200000 },
            ],
          },
          {
            name: "Vodka Absolut",
            prices: [
              { label: "Trago", value: 16000 },
              { label: "Media", value: 120000 },
              { label: "Botella", value: 210000 },
            ],
          },
          {
            name: "Tequila",
            prices: [
              { label: "Trago", value: 16000 },
              { label: "Botella", value: 170000 },
            ],
          },
        ],
      },
      {
        id: "cocteles",
        name: "Cócteles",
        dishes: [
          {
            name: "Margarita clásico",
            description: "Tequila, triple sec y zumo de limón.",
            prices: [{ value: 25000 }],
          },
          {
            name: "Mojito",
            description: "Base de ron, soda, hierbabuena, limón y azúcar.",
            prices: [{ value: 25000 }],
          },
          {
            name: "Cuba Libre",
            description: "Ron, Coca-Cola y zumo de limón.",
            prices: [{ value: 25000 }],
          },
          {
            name: "Piña colada",
            description: "Base cremosa de ron, piña, crema de leche y crema de coco.",
            prices: [{ value: 26000 }],
          },
          {
            name: "Margarita La Guayaba",
            description: "Tequila, zumo de guayaba, triple sec y zumo de limón.",
            prices: [{ value: 25000 }],
            tags: ["insignia"],
          },
        ],
      },
      {
        id: "cervezas",
        name: "Cervezas",
        dishes: [
          { name: "Club Colombia dorada", prices: [{ value: 7500 }] },
          { name: "Águila light", prices: [{ value: 7500 }] },
          { name: "Corona", prices: [{ value: 11000 }] },
          { name: "Pilsen", prices: [{ value: 7500 }] },
          { name: "Águila", prices: [{ value: 7500 }] },
          { name: "Andina", prices: [{ value: 7500 }] },
        ],
      },
    ],
  },
];

/** Formatea un precio en COP: 32000 → "$32.000". */
export function cop(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}
