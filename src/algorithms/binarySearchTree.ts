interface Reporte {
   id: number;
   estado: string;
   fechaPublicacion: string;
   prioridad: string
}

class NodoArbol {
   reporte: Reporte;
   izq: NodoArbol | null;
   der: NodoArbol | null;

   constructor(reporte: Reporte) {
      this.reporte = reporte;
      this.izq = null;
      this.der = null;
   }
}

class ArbolBusquedaBinaria {
   raiz: NodoArbol | null;

   constructor() {
      this.raiz = null;
   }

   agregar(reporte: Reporte) {
      const nuevoNodo = new NodoArbol(reporte);

      if (this.raiz === null) {
         this.raiz = nuevoNodo;
      } else {
         this.agregarNodo(this.raiz, nuevoNodo);
      }
   }

   agregarNodo(nodoActual: NodoArbol, nuevoNodo: NodoArbol) {
      if (nuevoNodo.reporte.id < nodoActual.reporte.id) {
         if (nodoActual.izq === null) {
            nodoActual.izq = nuevoNodo;
         } else {
            this.agregarNodo(nodoActual.izq, nuevoNodo);
         }
      } else {
         if (nodoActual.der === null) {
            nodoActual.der = nuevoNodo;
         } else {
            this.agregarNodo(nodoActual.der, nuevoNodo);
         }
      }
   }

   buscar(id: number) {
      return this.buscarNodo(this.raiz, id);
   }

   buscarNodo(nodoActual: NodoArbol | null, id: number): Reporte | null {
      if (nodoActual === null) {
         return null;
      }

      if (id === nodoActual.reporte.id) {
         return nodoActual.reporte;
      }

      if (id < nodoActual.reporte.id) {
         return this.buscarNodo(nodoActual.izq, id);
      } else {
         return this.buscarNodo(nodoActual.der, id);
      }
   }

   reportesPorMes() {
      const meses = Array.from({ length: 12 }, () => 0);
      this.reportesPorMesRecursivo(this.raiz, meses);
      return meses;
   }

   reportesPorMesRecursivo(nodoActual: NodoArbol | null, meses: number[]) {
      if (nodoActual !== null) {
         const fecha = new Date(nodoActual.reporte.fechaPublicacion);
         const mes = fecha.getMonth();
         meses[mes] += 1;
         this.reportesPorMesRecursivo(nodoActual.izq, meses);
         this.reportesPorMesRecursivo(nodoActual.der, meses);
      }
   }

   reportesPorEstado() {
      const estados = Array.from({ length: 3 }, () => 0);
      this.reportesPorEstadoRecursivo(this.raiz, estados);
      return estados;
   }

   reportesPorEstadoRecursivo(nodoActual: NodoArbol | null, estados: number[]) {
      if (nodoActual !== null) {
         switch (nodoActual.reporte.estado) {
            case 'TECNICO_NO_NECESARIO':
               estados[0] += 1;
               break;
            case 'TECNICO_POR_ASIGNAR':
               estados[1] += 1;
               break;
            case 'TECNICO_ASIGNADO':
               estados[2] += 1;
               break;
         }
         this.reportesPorEstadoRecursivo(nodoActual.izq, estados);
         this.reportesPorEstadoRecursivo(nodoActual.der, estados);
      }
   }

   reportesPorPrioridad() {
      const prioridades = Array.from({ length: 2 }, () => 0);
      this.reportesPorPrioridadRecursivo(this.raiz, prioridades);
      return prioridades;
   }

   reportesPorPrioridadRecursivo(nodoActual: NodoArbol | null, prioridades: number[]) {
      if (nodoActual !== null) {
         switch (nodoActual.reporte.prioridad) {
            case 'URGENTE':
               prioridades[0] += 1;
               break;
            case 'NO_URGENTE':
               prioridades[1] += 1;
               break;
         }
         this.reportesPorPrioridadRecursivo(nodoActual.izq, prioridades);
         this.reportesPorPrioridadRecursivo(nodoActual.der, prioridades);
      }
   }
}
export default ArbolBusquedaBinaria;