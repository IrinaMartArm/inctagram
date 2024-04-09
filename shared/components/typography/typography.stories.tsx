import type { Meta } from "@storybook/react";

import { Typography, TypographyVariantTypes } from "./Typography";

const variants: TypographyVariantTypes[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "body1",
  "body2",
  "caption",
  "subtitle1",
  "subtitle2",
  "error",
  "link1",
  "link2",
  "overline",
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
