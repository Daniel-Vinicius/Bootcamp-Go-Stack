import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then(response => {
      setProjects(response.data);
    });
  }, []);

 async function handleAddProject() {
   const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Daniel",
   });

   const project = response.data

   setProjects([...projects, project]);
 }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects} // data deve ser um array
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  project: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    backgroundColor: "#ffc403",
    borderColor: "#ffc403",
    borderRadius: 10,
    margin: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
  },
});

/*
Código Comentado
----------------------------------------------------------------
       <View style={styles.container}> // A view não tem scroll
        {
        projects.map(project => (
        <Text key={project.id} style={styles.project}>{project.title}</Text>
        ))}        
      </View> 
---------------------------------------------------------------

    container: {
    flex: 1,
    backgroundColor: "#7159c1",
    // justifyContent: "center",
    // alignItems: "center",
  },
*/
