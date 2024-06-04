interface Reporte {
  id: number;
  titulo: string;
  estado: string;
  fechaPublicacion: string;
  prioridad: string
}

export const handleReportSearch = (reportesMap: Map<string, Reporte>, setSearchResults: (results: Reporte[]) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
  const term = event.target.value;

  if (term.length > 0) {
    const results = Array.from(reportesMap.values())
      .filter(reporte =>
        reporte.titulo.toLowerCase().includes(term.toLowerCase()) //  SameValueZero algorithm
    );
    setSearchResults(results);
  } else {
    setSearchResults([]);
  }
};