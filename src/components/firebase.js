import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import keys from "../Keys";

class Firebase {
  constructor() {
    app.initializeApp(keys.getFirebaseConfig());
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  async getProduct(id) {
    const docRef = await this.db.collection("Productos").doc(id).get();
    return docRef;
  }
  async getClient(phone) {
    const docRef = this.db.collection("Cliente").doc(phone).get();
    return docRef;
  }
  async setPendingClient(client, products) {
    const docRef = await this.db
      .collection("Sucursal")
      .doc(this.auth.currentUser.uid)
      .collection("Pendiente")
      .add({
        Nombre: client.Nombre,
        Apellido: client.Apellido,
        Telefono: client.Telefono,
        Productos: products,
        Total: client.Total,
      });
    return docRef;
  }
  async updatePendingClient(client, products) {
    const docRef = await this.db
      .collection("Sucursal")
      .doc(this.auth.currentUser.uid)
      .collection("Pendiente")
      .doc(client.Cid)
      .set(
        {
          Nombre: client.Nombre,
          Apellido: client.Apellido,
          Telefono: client.Telefono,
          Productos: products,
          Total: client.Total,
        },
        { merge: true }
      );
    return docRef;
  }

  async getPendingSales() {
    const docRef = await this.db
      .collection("Sucursal")
      .doc(this.auth.currentUser.uid)
      .collection("Pendiente")
      .get();
    return docRef;
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}
export default new Firebase();
