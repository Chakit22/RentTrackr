import {
  useSegments,
  useRouter,
  usePathname,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const NavigationDebugger = () => {
  const segments = useSegments();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  // Cast segments to the correct type
  const segmentsArray = Array.isArray(segments) ? segments : [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Navigation Debug Info</Text>

        <Text style={styles.sectionTitle}>Current Path:</Text>
        <Text style={styles.value}>{pathname}</Text>

        <Text style={styles.sectionTitle}>Segments:</Text>
        {segmentsArray.length === 0 ? (
          <Text style={styles.value}>No segments</Text>
        ) : (
          segmentsArray.map((segment, index) => (
            <View key={index} style={styles.segmentRow}>
              <Text style={styles.index}>{index}</Text>
              <Text style={styles.value}>{segment}</Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>Path Parameters:</Text>
        {Object.keys(params).length === 0 ? (
          <Text style={styles.value}>No parameters</Text>
        ) : (
          Object.entries(params).map(([key, value], index) => (
            <View key={index} style={styles.paramRow}>
              <Text style={styles.paramKey}>{key}:</Text>
              <Text style={styles.value}>{String(value)}</Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>Navigation Tree:</Text>
        <View style={styles.tree}>
          <Text style={styles.root}>app/</Text>
          {segmentsArray.length > 0 && renderTree(segmentsArray)}
        </View>
      </ScrollView>
    </View>
  );
};

// Helper function to build tree visualization
const renderTree = (segments: string[]) => {
  return segments.reduce((acc, segment, index) => {
    return (
      <View key={index}>
        {acc}
        <View style={{ marginLeft: index * 12 }}>
          <Text style={styles.treeSegment}>└─ {segment}/</Text>
        </View>
      </View>
    );
  }, <View />);
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  scrollView: {
    maxHeight: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    color: "#555",
  },
  value: {
    fontSize: 14,
    color: "#333",
    padding: 4,
  },
  segmentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  paramRow: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  index: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#eee",
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    marginRight: 8,
    overflow: "hidden",
  },
  paramKey: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4,
    color: "#666",
  },
  tree: {
    paddingLeft: 4,
  },
  root: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  treeNode: {
    marginLeft: 8,
  },
  treeSegment: {
    fontSize: 14,
    color: "#333",
  },
  treeChild: {
    marginLeft: 12,
  },
});
