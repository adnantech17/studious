import React from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";
import { auth } from "../../Configs/firebase.config";

const Profile = ({ currentUser, navigation }) => {
    return (
        currentUser && (
            <View>
                <Text>{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
                <Text>{currentUser.email}</Text>

                <Button
                    title="Details"
                    onPress={ () => navigation.push("Details") }
                />
                <Button
                    title="Log Out"
                    onPress={async () => {
                        await auth.signOut();
                    }}
                />
            </View>
        )
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Profile);
