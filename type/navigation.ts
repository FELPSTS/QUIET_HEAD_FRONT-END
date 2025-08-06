export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  // Adicione outras rotas aqui
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}