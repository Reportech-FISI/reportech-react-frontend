/* eslint-disable react/no-children-prop */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Registro } from '../models/registro/Registro';
import { Equipo } from '../models/equipo/Equipo';
import { ReporteProvider, useReporte } from './ReporteContext';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  grayText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    marginTop: 20,
  },
  column: {
    flexDirection: 'column',
    flexGrow: 1,
    marginRight: 20,
  },
  divider: {
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 20,
  },
});



export const PDF = () => {

  // const {reporteC, equipoC} = useReporte();
  // const Id = () => `${reporteC.id}`;

  const fetchedReporte= JSON.parse(localStorage.getItem("reporteC")!);
  const fetchedEquipo= JSON.parse(localStorage.getItem("equipoC")!);
  console.log(fetchedReporte);
  console.log(fetchedEquipo);
  const { id: idTrabajador, userReporterNombre, titulo, estado, fechaPublicacion, prioridad, userDesignado, clasificacion, ubicacion } = fetchedReporte;
  const { id: idEquipo, estadoReparacion, descripcion, nombre } = fetchedEquipo;

  const fecha = new Date(fechaPublicacion);
  const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;


  const IdTrabajador = () => `${idTrabajador}`;
  const IdEquipo = () => `${idEquipo}`;
  const UserReporterNombre = () => `${userReporterNombre}`;
  const Titulo = () => `${titulo}`;
  const FechaPublicacion = () => `${fechaFormateada}`;
  const Prioridad = () => `${prioridad}`;
  const UserDesignado = () => `${userDesignado}`;
  const Clasificacion = () => `${clasificacion}`;
  const Ubicacion = () => `${ubicacion}`;
  const EstadoReparacion = () => `${estadoReparacion}`;
  const Descripcion = () => `${descripcion}`;
  const Nombre = () => `${nombre}`;
  
  const savedFotoId = localStorage.getItem('fotoid') as string;
  const fotoid = JSON.parse(savedFotoId);
  const Foto = () => `http://localhost:8080/api/equipo/img/${fotoid}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View>
              <Text style={styles.boldText}>
                Reporte_
                <Text children={<IdTrabajador/>} /> 
              </Text>
              <Text style={styles.grayText}>
                <Text children={<FechaPublicacion/>} />
              </Text>
            </View>
            <Text style={styles.title}>Reportech</Text>
          </View>
          
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.boldText}>FISI, UNMSM</Text>
            <Text style={styles.grayText}>Av. Amezaga, Lima 5081</Text>
            <Text style={styles.grayText}>Lima</Text>
            <Text style={styles.grayText}>Perú</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.subtitle}>
            <Text children={<Titulo/>} />
          </Text>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.boldText}>Reportante</Text>
              <Text style={styles.grayText}>
                <Text children={<UserReporterNombre/>} />
              </Text>
              <Text style={[styles.boldText, { marginTop: 15 }]}>Prioridad</Text>
              <Text style={styles.grayText}>
                <Text children={<Prioridad/>} />
              </Text>
              <Text style={[styles.boldText, { marginTop: 15 }]}>Ubicación</Text>
              <Text style={styles.grayText}>
                <Text children={<Ubicacion/>} />
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.boldText}>Técnico asignado</Text>
              <Text style={styles.grayText}>
                <Text children={<UserDesignado/>} />
              </Text>
              <Text style={[styles.boldText, { marginTop: 15 }]}>Estado de reparación</Text>
              <Text style={styles.grayText}>
                <Text children={<EstadoReparacion/>} />
              </Text>
              <Text style={[styles.boldText, { marginTop: 15 }]}>Clasificacion del problema</Text>
              <Text style={styles.grayText}>
                <Text children={<Clasificacion/>} />
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.subtitle}>Equipo afectado</Text>
          <Text style={styles.grayText}>#
            <Text children={<IdEquipo/>} />
          </Text>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.boldText}>Nombre</Text>
              <Text style={styles.grayText}>
                <Text children={<Nombre/>} />
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.boldText}>Estado de reparacion</Text>
              <Text style={styles.grayText}>
                <Text children={<EstadoReparacion/>} />
              </Text>
            </View>
          </View>
          <Text style={[styles.boldText, { marginTop: 15 }]}>Descripcion</Text>
          <Text style={styles.grayText}>
            <Text children={<Descripcion/>} />
          </Text>

          <View style={styles.divider} />

          <Text style={styles.boldText}>Foto</Text>
          <Text style={styles.grayText}>
          <View style={styles.divider} />
            <Text children={<Foto/>}/>
          </Text>

          <Text style={styles.footer}>© Copyright. All rights reserved. Reportech, 2024. Printed by USER.</Text>
        </View>
      </Page>
    </Document>
  )

}

export default PDF;