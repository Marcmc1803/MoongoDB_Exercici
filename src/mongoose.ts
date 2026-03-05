import mongoose from 'mongoose';
// Fem l'import del TEU servei
import * as projectService from '../services/projectService.js';

async function ejecutarMiEjercicio() {
  try {
    // 1. Connexió (usant la teva BD de la imatge de Compass)
    await mongoose.connect('mongodb://127.0.0.1:27017/ea_mongoose');
    console.log('✅ CONNECTAT A LA BASE DE DADES');

    console.log('\n--- 🚀 EXECUTANT EL MEU CRUD DE PROJECTES ---');

    // 2. PROVA DE CREACIÓ (CREATE)
    const nouProjecte = await projectService.createProject({
      name: 'Projecte de Marc',
      description: 'Aquest és el meu exercici del seminari',
      organization: new mongoose.Types.ObjectId(), // ID temporal
      status: 'active'
    });
    console.log('✔ Projecte creat amb èxit:', nouProjecte.name);

    // 3. PROVA DE LLISTAT (LIST ALL amb .lean)
    const llistat = await projectService.listAllProjects();
    console.log('✔ Nombre de projectes a la BD:', llistat.length);
    console.log('✔ Dada recuperada (lean):', llistat[llistat.length - 1].name);

    // 4. PROVA D'ACTUALITZACIÓ (UPDATE)
    const actualitzat = await projectService.updateProject(nouProjecte._id as string, {
      status: 'completed'
    });
    console.log('✔ Estat actualitzat a:', actualitzat?.status);

    // 5. PROVA D'ELIMINACIÓ (DELETE)
    await projectService.deleteProject(nouProjecte._id as string);
    console.log('✔ Projecte de prova eliminat correctament');

  } catch (error) {
    console.error('❌ ERROR EN L\'EXECUCIÓ:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔚 PROVA FINALITZADA');
    process.exit(0);
  }
}

ejecutarMiEjercicio();