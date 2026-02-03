import type { Product } from '../types/product';

export const personifandaProduct: Product = {
	id: 2,
	name: "Personifanda",
	description:
		"Guaufanda artesanal para humano, talla única. Tejida a mano con lana 100% natural. Perfecta para hacer conjunto con tu mascota.",
	basePrice: 35.9,
	currency: "EUR",
	mainImage: "https://i.ibb.co/r22Z1RY3/cherry.webp",
	category: "Ropa",
	slug: "personifanda",
	weight: 0.15,
	tags: ["humano", "talla única"],
	variants: [
		{
			color: "Cherry",
			colorHex: "#4f0817",
			images: ["https://i.ibb.co/r22Z1RY3/cherry.webp"],
			sizes: [
				{
					size: "Única",
					price: 35.9,
					stock: null,
					sku: "GH-CHERRY-U"
				}
			],
			sku: "GH-CHERRY"
		},
		{
			color: "Candy",
			colorHex: "#FFB6C1",
			images: ["https://i.ibb.co/b5jsykFb/candy.webp"],
			sizes: [
				{
					size: "Única",
					price: 35.9,
					stock: null,
					sku: "GH-CANDY-U"
				}
			],
			sku: "GH-CANDY"
		},
		{
			color: "Caramelo",
			colorHex: "#C68642",
			images: ["https://i.ibb.co/DgSPvq3Z/caramelo.webp"],
			sizes: [
				{
					size: "Única",
					price: 35.9,
					stock: null,
					sku: "GH-CARAMELO-U"
				}
			],
			sku: "GH-CARAMELO"
		},
		{
			color: "Mango",
			colorHex: "#FFB347",
			images: ["https://i.ibb.co/7NxYTz53/mango.webp"],
			sizes: [
				{
					size: "Única",
					price: 35.9,
					stock: null,
					sku: "GH-MANGO-U"
				}
			],
			sku: "GH-MANGO"
		},
		{
			color: "Zafiro",
			colorHex: "#0F52BA",
			images: ["https://i.ibb.co/WLJz4KY/zafiro.webp"],
			sizes: [
				{
					size: "Única",
					price: 35.9,
					stock: null,
					sku: "GH-ZAFIRO-U"
				}
			],
			sku: "GH-ZAFIRO"
		},
		{
			color: "Capri",
			colorHex: "#3B7BBF",
			images: ["https://i.ibb.co/nHjn5zp/capri.webp"],
			sizes: [
				{
					size: "Única",
					price: 35.9,
					stock: null,
					sku: "GH-CAPRI-U"
				}
			],
			sku: "GH-CAPRI"
		}
	]
};
