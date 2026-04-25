import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className={cn("relative z-0 w-full group", className)}>
        <input
          type={type}
          id={inputId}
          className="block py-3.5 px-4 w-full text-sm text-foreground bg-transparent border-2 border-border/80 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="peer-focus:font-medium absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3.5 z-10 origin-[0] left-4 bg-background px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
        >
          {label}
        </label>
      </div>
    )
  }
)
FloatingInput.displayName = "FloatingInput"

export interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className={cn("relative z-0 w-full group", className)}>
        <textarea
          id={inputId}
          className="block py-3.5 px-4 w-full text-sm text-foreground bg-transparent border-2 border-border/80 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors min-h-[120px] resize-y"
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="peer-focus:font-medium absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3.5 z-10 origin-[0] left-4 bg-background px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
        >
          {label}
        </label>
      </div>
    )
  }
)
FloatingTextarea.displayName = "FloatingTextarea"

export { FloatingInput, FloatingTextarea }
