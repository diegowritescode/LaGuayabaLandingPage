"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso de entrada en segundos. */
  delay?: number;
  /** Dirección desde la que aparece el contenido. */
  direction?: Direction;
  /** Distancia del desplazamiento inicial en px. */
  distance?: number;
  /** Se anima solo la primera vez que entra en pantalla. */
  once?: boolean;
  as?: "div" | "li" | "span" | "section";
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Revela su contenido con un fade + desplazamiento suave al entrar en pantalla.
 * Si el usuario prefiere menos movimiento, aparece sin desplazamiento.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const { x, y } = offsets[direction];

  const variants: Variants = {
    // Con "menos movimiento" el contenido aparece de inmediato (nunca queda
    // oculto esperando un scroll que dispare la animación).
    hidden: {
      opacity: reduce ? 1 : 0,
      x: reduce ? 0 : x * distance,
      y: reduce ? 0 : y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as] as React.ElementType;

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Contenedor que escalona la aparición de sus hijos directos envueltos en
 * <StaggerItem>. Útil para grillas de tarjetas.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.12,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren, staggerChildren },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: reduce
            ? { duration: 0 }
            : { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
