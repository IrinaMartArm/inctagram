import { Typography } from "@/shared/components";

type Props = { text: string };

export const InformationText = ({ text }: Props) => {
  return (
    <Typography as={"p"} variant={"regular_text-14"}>
      {text}
    </Typography>
  );
};
