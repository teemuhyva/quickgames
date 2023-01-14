import { format } from "date-fns";
import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { GameType, GameTypeString, NewPlayer } from "../../interfaces/interfaces";
import { createPlayer, getPlayerWaitingList } from "../../Realm/Realm";

