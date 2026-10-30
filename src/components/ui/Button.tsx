// src/components/ui/Button.tsx
import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

// Toutes les props natives de <button> (onClick, disabled, aria-*, ref, children…) + les nôtres
type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  type = "button", // un <button> dans un <form> vaut "submit" par défaut : on inverse le défaut
  className, // extrait pour être fusionné, pas écrasé
  ...rest // tout le reste, y compris children et ref, va au <button> natif
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  return <button type={type} className={classes} {...rest} />;
}
