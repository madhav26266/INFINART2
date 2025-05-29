import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

// --- Inline styles ---
const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
};

const contentBaseStyle = {
  position: "fixed",
  zIndex: 50,
  padding: "1.5rem",
  backgroundColor: "white",
  boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
};

const sideStyles = {
  top: {
    top: 0,
    left: 0,
    right: 0,
    borderBottom: "1px solid #ccc",
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #ccc",
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
    height: "100%",
    width: "75%",
    maxWidth: "400px",
    borderRight: "1px solid #ccc",
  },
  right: {
    top: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "75%",
    maxWidth: "400px",
    borderLeft: "1px solid #ccc",
  },
};

const closeButtonStyle = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  opacity: 0.7,
};

const headerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  textAlign: "center",
};

const footerStyle = {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "0.5rem",
  alignItems: "flex-end",
};

const titleStyle = {
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#000",
};

const descriptionStyle = {
  fontSize: "0.875rem",
  color: "#666",
};

// --- Components ---
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef(
  ({ style, ...props }, ref) => (
    <SheetPrimitive.Overlay
      ref={ref}
      style={{ ...overlayStyle, ...style }}
      {...props}
    />
  )
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef(
  ({ 
    side = "right", 
    style, 
    children, 
    title, 
    description, 
    ...props 
  }, ref) => {
    // Generate ID for description if it exists
    const descriptionId = description ? "sheet-description" : undefined;

    return (
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          ref={ref}
          aria-describedby={descriptionId}
          style={{ ...contentBaseStyle, ...sideStyles[side], ...style }}
          {...props}
        >
          {(title || description) && (
            <SheetHeader>
              {title && <SheetTitle>{title}</SheetTitle>}
              {description && (
                <SheetDescription id={descriptionId}>{description}</SheetDescription>
              )}
            </SheetHeader>
          )}
          {children}
          <SheetPrimitive.Close asChild>
            <button style={closeButtonStyle}>
              <X width={16} height={16} />
              <span style={{ display: "none" }}>Close</span>
            </button>
          </SheetPrimitive.Close>
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  }
);


SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ style, ...props }) => (
  <div style={{ ...headerStyle, ...style }} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ style, ...props }) => (
  <div style={{ ...footerStyle, ...style }} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef(
  ({ style, ...props }, ref) => (
    <SheetPrimitive.Title
      ref={ref}
      style={{ ...titleStyle, ...style }}
      {...props}
    />
  )
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef(
  ({ style, ...props }, ref) => (
    <SheetPrimitive.Description
      ref={ref}
      style={{ ...descriptionStyle, ...style }}
      {...props}
    />
  )
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// --- Exports ---
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
