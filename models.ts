import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "./pelis.json").then((peli) => {
      // la respuesta de la promesa
      return peli;
    });
  }
  async getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peli) => {
      if (peli) {
        return false;
      } else {
        return this.getAll().then((data) => {
          data.push(peli);
          const prom = jsonfile.writeFile("./pelis.json", data);
          return prom.then(() => {
            return true;
          });
        });
      }
    });
  }
  async search(opc) {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((p) => {
      if (opc.tag && opc.title) {
        return p.tags.includes(opc.tag) && p.title.includes(opc.title);
      }
      if (opc.tag) {
        return p.tags.includes(opc.tag);
      }
      if (opc.title) {
        return p.title.includes(opc.title);
      }
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
