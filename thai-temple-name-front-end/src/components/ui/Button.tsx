import { ButtonHTMLAttributes, forwardRef} from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "bg-bronze-c text-md flex justify-center p-2 items-center rounded-md transition-all active:scale-[99%] hover:bg-orange-400  disabled:pointer-events-none disabled:bg-gray-400 cursor-pointer",
  {
    variants: {
      size: {
        "default": "w-full",
        "content": "w-fit",
        "sm" : "h-8 text-sm",
        "md" : "h-12 text-md"
      },
    },
    defaultVariants: {
      size : "default",
    }
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  disabled? : boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className, children, size, isLoading, disabled,...props
},ref) => {
  return <button
    className={cn(buttonVariants({size, className:className}))}
    ref={ref}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
})

Button.displayName = 'Button'

export default Button