import React from "react";
import cn from "classnames";

interface IBoxProps {
  children: React.ReactNode;
  className?: string; 
}

interface IBoxSubComponent extends IBoxProps {
  Title: React.FC<IBoxProps>;
  Content: React.FC<IBoxProps>;
  Footer: React.FC<IBoxProps>;
}

type BoxComponent = React.FC<IBoxProps> & IBoxSubComponent;

const BoxBase: React.FC<IBoxProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full flex flex-col gap-2 p-3 bg-[#212121] rounded-lg", className)}>
      { children }
    </div>
  )
}

const Title: React.FC<IBoxProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full flex items-center justify-between gap-2 text-lg font-bold", className)}>
      { children }
    </div>
  )
}

const Content: React.FC<IBoxProps> = ({ children, className }) => {
  return (
    <div className={cn("", className)}>
      { children }
    </div>
  )
}

const Footer: React.FC<IBoxProps> = ({ children, className }) => {
  return (
    <div className={cn("", className)}>
      { children }
    </div>
  )
}

const Box = BoxBase as BoxComponent
Box.Title = Title
Box.Content = Content
Box.Footer = Footer

export default Box;