import mongoose from 'mongoose';
// CANVI CLAU: Usem .js en lloc de .ts per compatibilitat amb ESM
import * as projectService from './services/projectService.js';

async function ejecutarMiEjercicio() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ea_mongoose');
        console.log('✅ CONNECTAT A LA BASE DE DADES');
        console.log('\n--- 🚀 EXECUTANT EL MEU CRUD DE PROJECTES ---');

        // 2. CREATE
        const nouProjecte = await projectService.createProject({
            name: 'Projecte de Marc',
            description: 'Aquest és el meu exercici del seminari',
            organization: new mongoose.Types.ObjectId(), 
            status: 'active'
        });
        console.log('✔ Projecte creat amb èxit:', nouProjecte.name);

        // 3. LIST ALL
        const llistat = await projectService.listAllProjects();
        console.log('✔ Nombre de projectes a la BD:', llistat.length);
        
        // 4. UPDATE
        // Nota: Passem l'ID com a string si el servei ho espera així
        const actualitzat = await projectService.updateProject(nouProjecte._id.toString(), {
            status: 'completed'
        });
        console.log('✔ Estat actualitzat a:', actualitzat?.status);

        // 5. DELETE
        await projectService.deleteProject(nouProjecte._id.toString());
        console.log('✔ Projecte de prova eliminat correctament');
    }
    catch (error) {
        console.error('❌ ERROR EN L\'EXECUCIÓ:', error);
    }
    finally {
        await mongoose.disconnect();
        console.log('\n🔚 PROVA FINALITZADA');
        process.exit(0);
    }
}
ejecutarMiEjercicio();