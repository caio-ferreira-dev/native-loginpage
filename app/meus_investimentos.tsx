import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView , StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type investmentsType = {
  id: number;
  name: string;
  description: string;
  shares: number;
  price: string;
  image: string;
};
const mockInvestments: investmentsType[] = [
  {
    id: 1,
    name: "Nome do empreendimento",
    description:
      "Breve descrição do empreendimento aqui, ou outras informações...",
    shares: 100,
    price: "R$ 15.000.000,00",
    image: "../assets/images/mocks/banner_1.png",
  },
  {
    id: 2,
    name: "Nome do empreendimento",
    description:
      "Breve descrição do empreendimento aqui, ou outras informações...",
    shares: 200,
    price: "R$ 20.000.000,00",
    image: "../assets/images/mocks/banner_2.png",
  },
];

export default function InvestmentsScreen() {
  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Image
            source={
                /*{ uri: "https://via.placeholder.com/50",}*/ require("../assets/images/mocks/profile_placeholder.png")
            }
            style={styles.profileImage}
            />
            <View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userRole}>Investidor</Text>
            </View>
            <Ionicons
            name="notifications-outline"
            size={24}
            color="white"
            style={styles.notificationIcon}
            />
        </View>

        {/* Aviso */}
        <View style={styles.notice}>
            <Text style={styles.noticeText}>
            {" "}
            Algum aviso importante aqui para todos!
            </Text>
        </View>
        <View style={styles.mainContent}>
            {/* Meus Investimentos */}
            <Text style={styles.sectionTitle}>Meus investimentos</Text>

            {mockInvestments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
            ))}
        </View>
        
        </ScrollView>
        <View style={styles.footer}>
            <Text style={{ color: "#b9ccd8", fontSize: 16 }}>
            Precisa de ajuda?
            </Text>
            <Image
            source={require("../assets/images/mocks/headphones_icon.jpg")}
            style={styles.footerImage}
            ></Image>
        </View>
    </SafeAreaView>
  );
}

type InvestmentCardProps = {
  investment: investmentsType;
};

function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/images/mocks/banner_1.png")}
        style={styles.cardImage}
      />
      <LinearGradient colors={["#9b7742", "#cfbea5"]} style={styles.badge}>
        <Text style={styles.badgeText}>NOVO</Text>
      </LinearGradient>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{investment.name}</Text>
        <Text style={styles.cardDescription}>{investment.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.shares}>{investment.shares} cotas</Text>
          <View style={styles.price}>
            <Text style={{ fontWeight: "bold", color: "#4f7289" }}>
              {investment.price}
            </Text>
            <Text style={{ color: "#54d286" }}>▲</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#1E3163",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { color: "white", fontWeight: "bold", fontSize: 16 },
  userRole: { color: "white", fontSize: 12 },
  notificationIcon: { marginLeft: "auto" },
  notice: { backgroundColor: "#1E3163", padding: 20 },
  noticeText: {
    backgroundColor: "#fff",
    color: "#856404",
    padding: 23,
    borderRadius: 10,
  },
  sectionTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 150 },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: "bold", color: "#ffffff" },
  cardContent: { padding: 20 },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  cardDescription: { fontSize: 12, marginVertical: 5, maxWidth: 200 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f1f5f7",
    padding: 10,
    marginTop: 26,
    borderRadius: 5,
  },
  shares: { color: "#2d3133" },
  price: { flexDirection: "row" },
  mainContent: { paddingHorizontal: 30, paddingTop: 40, marginBottom: 70 },
  footer: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    width: "100%",
    height: 65,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderStyle: "solid",
    borderTopColor: "#b9ccd8",
  },
  footerImage: { marginLeft: 15, height: 25, width: 25 },
});
