import React, { Component } from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { getDatabase, ref, child, onValue } from "firebase/database";

import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationKey: 1,
      number: "",
      street: "",
      district: "",
      city: "",
      phone: "",
      fax: "",
      email: "",
    };

    this.focusListener = this.props.navigation.addListener("focus", () => {
      // Update the state to change the key and force re-render
      this.setState({ animationKey: this.state.animationKey + 1 });
    });
  }

  render() {
    return (
      <Animatable.View
        key={this.state.animationKey}
        animation="fadeInDown"
        duration={2000}
        delay={1000}
      >
        <Card>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>
            {this.state.number}, {this.state.street}
          </Text>
          <Text style={{ margin: 10 }}>{this.state.district}</Text>
          <Text style={{ margin: 10 }}>{this.state.city}</Text>
          <Text style={{ margin: 10 }}>Tel: {this.state.phone}</Text>
          <Text style={{ margin: 10 }}>Fax: {this.state.fax}</Text>
          <Text style={{ margin: 10 }}>Email: {this.state.email}</Text>
          <Button
            title=" Compose Email"
            buttonStyle={{ backgroundColor: "#7cc" }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.composeMail}
          />
        </Card>
      </Animatable.View>
    );
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, "contact/"), (snapshot) => {
      const value = snapshot.val();
      this.setState({
        number: value.address.number,
        street: value.address.street,
        district: value.address.district,
        city: value.address.city,
        phone: value.phone,
        fax: value.fax,
        email: value.email,
      });
    });
  }

  composeMail() {
    MailComposer.composeAsync({
      recipients: ["hieu.nt12296@sinhvien.hoasen.edu.vn"],
      subject: "From Confusion",
      body: "Hello my friends ...",
    });
  }
}
export default Contact;
