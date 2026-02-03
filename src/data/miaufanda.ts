import type { Product } from '../types/product';

export const miaufandaProduct: Product = {
	id: 4,
	name: "Miaufanda",
	description:
		"Ropa artesanal de lana 100% natural tejida a mano especialmente diseñada para gatos. Perfecta para el confort de tu michi en los días fríos.",
	basePrice: 21.99,
	currency: "EUR",
	mainImage: "https://i.ibb.co/nMmKnZqh/cherry.webp",
	category: "Ropa",
	slug: "miaufanda",
	weight: 0.25,
	tags: ["gatos", "artesanal", "lana", "michi"],
	variants: [
		{
			color: "Cherry",
			colorHex: "#4f0817",
			images: ["https://i.ibb.co/JhVw6vf/cherry.webp"],
			sizes: [
				{
					size: "XS",
					price: 19.9,
					stock: null,
					sku: "MIAU-CLAS-CHERRY-XS"
				}
			],
			sku: "MIAU-CLAS-CHERRY"
		},
		{
			color: "Candy",
			colorHex: "#FFB6C1",
			images: ["https://i.ibb.co/wrrqKGr5/candy.webp"],
			sizes: [
				{
					size: "XS",
					price: 19.9,
					stock: null,
					sku: "MIAU-CLAS-CANDY-XS"
				}
			],
			sku: "MIAU-CLAS-CANDY"
		},
		{
			color: "Caramelo",
			colorHex: "#C68642",
			images: ["https://i.ibb.co/gZKh3sz6/caramelo.webp"],
			sizes: [
				{
					size: "XS",
					price: 19.9,
					stock: null,
					sku: "MIAU-CLAS-CARAMELO-XS"
				}
			],
			sku: "MIAU-CLAS-CARAMELO"
		},
		{
			color: "Mango",
			colorHex: "#FFB347",
			images: ["https://i.ibb.co/ds33LfZW/mango.webp"],
			sizes: [
				{
					size: "XS",
					price: 19.9,
					stock: null,
					sku: "MIAU-CLAS-MANGO-XS"
				}
			],
			sku: "MIAU-CLAS-MANGO"
		},
		{
			color: "Zafiro",
			colorHex: "#0F52BA",
			images: ["https://i.ibb.co/N6Q0gPtK/zafiro.webp"],
			sizes: [
				{
					size: "XS",
					price: 19.9,
					stock: null,
					sku: "MIAU-CLAS-ZAFIRO-XS"
				}
			],
			sku: "MIAU-CLAS-ZAFIRO"
		},
		{
			color: "Capri",
			colorHex: "#3B7BBF",
			images: ["https://i.ibb.co/rGvXXGrJ/capri.webp"],
			sizes: [
				{
					size: "XS",
					price: 19.9,
					stock: null,
					sku: "MIAU-CLAS-CAPRI-XS"
				}
			],
			sku: "MIAU-CLAS-CAPRI"
		}
	]
};
