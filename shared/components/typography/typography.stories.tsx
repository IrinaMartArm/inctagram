import type { Meta } from "@storybook/react";

import { Typography, TypographyVariantTypes } from "./Typography";

const variants: TypographyVariantTypes[] = [
  "Large",
  "h1",
  "h2",
  "h3",
  "regular_text-16",
  "Bold_text-16",
  "regular_text-14",
  "Medium_text-14",
  "bold_text-14",
  "small-text",
  "Semi-bold_small-text",
  "regular_link",
  "small_link",
  "error",
];

export default {
  component: Typography,
  tags: ["autodocs"],
  title: "Components/Typography",
} as Meta<typeof Typography>;

export const AllVariants = {
  render: () => (
    <div>
      {variants.map((variant) => (
        <div key={variant} style={{ margin: "10px 0" }}>
          <Typography variant={variant}>
            {variant}: The quick brown fox jumps over the lazy dog.
          </Typography>
        </div>
      ))}
    </div>
  ),
};
