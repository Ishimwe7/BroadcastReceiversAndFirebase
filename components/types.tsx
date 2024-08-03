import { NavigationProp, ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: undefined;
};

export type TabParamList = {
  Registration: undefined;
  Login: undefined;
  Calculator: undefined;
  Contacts: undefined;
};

export type RootDrawerParamList = {
  MainTabs: undefined;
};

export type NavigationProps = NavigationProp<ParamListBase>;