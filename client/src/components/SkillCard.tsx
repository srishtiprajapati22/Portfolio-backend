import { motion } from "framer-motion";
import { type Skill } from "@shared/schema";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-lg text-slate-200 group-hover:text-primary transition-colors">
          {skill.name}
        </h4>
        <span className="text-xs font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
          {skill.category}
        </span>
      </div>
      
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full relative"
        >
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}
