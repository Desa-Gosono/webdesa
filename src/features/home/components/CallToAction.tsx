import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';
import { ArrowRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CallToAction() {
  const { useFetchProfile } = useProfile();
  const { data: profile } = useFetchProfile();
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden bg-primary-600/80 dark:bg-primary-900/80 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
             <Target className="w-12 h-12 text-white/80" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Visi Desa Gosono</h2>
          
          <p className="text-white text-xl md:text-2xl font-medium italic mb-12 leading-relaxed">
            "{profile?.vision || "Menuju desa yang mandiri, sejahtera, dan berbudaya dengan mengedepankan nilai-nilai gotong royong."}"
          </p>

          <div className="flex justify-center">
            <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full shadow-lg font-semibold group px-8" onClick={() => navigate('/profil')}>
              Selengkapnya tentang Desa Gosono
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}