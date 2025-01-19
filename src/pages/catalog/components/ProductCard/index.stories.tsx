import { ComponentProps } from "react";
import { Provider } from "react-redux";
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "./ProductCard";
import { store } from "../../../../store";
import { fn } from "@storybook/test";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useDarkMode } from "storybook-dark-mode";

type StoryProps = ComponentProps<typeof ProductCard>;

const meta: Meta<StoryProps> = {
  component: ProductCard,
  decorators: [
    (Story) => {
      const isDarkTheme = useDarkMode();

      if (isDarkTheme) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      return (
        <ThemeContext.Provider
          value={{ isDarkTheme: true, setTheme: () => {} }}
        >
          <Provider store={store}>
            <BrowserRouter>
              <Story />
            </BrowserRouter>
          </Provider>
        </ThemeContext.Provider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    product: {
      id: 1,
      category: "Beauty",
      description: "Essence Mascara Lash Princess",
      isLiked: true,
      price: 12.99,
      rating: 4.2,
      title: "Essence Mascara",
      images: ["https://via.placeholder.com/150"],
    },
    addToCartHandler: fn(),
    toggleLikeHandler: fn(),
  },
};

export const Discounted: Story = {
  args: {
    product: {
      id: 2,
      category: "Electronics",
      description: "Latest smartphone with advanced features.",
      isLiked: false,
      price: 899.99,
      rating: 4.8,
      title: "Smartphone Pro",
      images: ["https://via.placeholder.com/150"],
    },
    addToCartHandler: fn(),
    toggleLikeHandler: fn(),
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      id: 3,
      category: "Toys",
      description: "Educational toy for kids aged 5-10 years.",
      isLiked: false,
      price: 29.99,
      rating: 4.0,
      title: "Kids Educational Toy",
      images: ["https://via.placeholder.com/150"],
    },
    addToCartHandler: fn(),
    toggleLikeHandler: fn(),
  },
};
