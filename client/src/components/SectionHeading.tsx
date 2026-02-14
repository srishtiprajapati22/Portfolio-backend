import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, alignment = "center" }: SectionHeadingProps) {
  const alignClass = alignment === "left" ? "text-left items-start" : alignment === "right" ? "text-right items-end" : "text-center items-center";
  
  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        <span className="text-primary font-mono text-sm tracking-wider uppercase mb-2 block">
          {subtitle}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 pb-2">
          {title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-blue-600 rounded-full mt-4 mx-auto" style={{ marginLeft: alignment === 'left' ? '0' : 'auto', marginRight: alignment === 'right' ? '0' : 'auto' }} />
      </motion.div>
    </div>
  );
}
