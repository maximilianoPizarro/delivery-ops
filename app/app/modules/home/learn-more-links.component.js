/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// slightly modified version of https://github.com/facebook/react-native/blob/e028ac7af2d5b48860f01055f3bbacf91f6b6956/Libraries/NewAppScreen/components/LearnMoreLinks.js

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import React from 'react';
import { Colors } from '../../shared/themes';

const links = [
  {
    id: 1,
    title: 'Jhipster',
    link: 'https://www.jhipster.tech/',
    description: "Explains this app's project generator.",
  },
  {
    id: 2,
    title: 'Expo',
    link: 'https://expo.dev/',
    description: 'Explains a Expo Go project.',
  },
  {
    id: 3,
    title: 'GitHub',
    link: 'https://github.com/maximilianoPizarro/delivery-ops',
    description: 'Repository Code Project Devlivery Ops.',
  },
  {
    id: 4,
    title:'Backoffice',
    link: 'https://delivery-ops.herokuapp.com',
    description: 'Jhipster Administrator Backoffice',
  },
  {
    id: 5,
    title: 'ReactNative',
    link: 'https://reactnative.dev/',
    description: 'React Native Documentation',
  },
  {
    id: 6,
    title: 'Contact',
    link: 'http://www.linkedin.com/in/maximiliano-gregorio-pizarro-consultor-it',
    description: 'About me. Maximiliano Gregorio Pizarro',
  },
  {
    id: 7,
    title: 'Storybook',
    link: 'https://github.com/jhipster/generator-jhipster-react-native/blob/main/docs/storybook.md',
    description: 'How to use Storybook with React Native.',
  },
];

const LinkList = () => (
  <View style={styles.container}>
    {links.map(({ id, title, link, description }) => {
      return (
        <React.Fragment key={id}>
          <View style={styles.separator} />
          <TouchableOpacity accessibilityRole={'button'} onPress={() => Linking.openURL(link)} style={styles.linkContainer}>
            <Text style={styles.link}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </TouchableOpacity>
        </React.Fragment>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    flex: 2,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  description: {
    flex: 3,
    paddingVertical: 5,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.white,
  },
  separator: {
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default LinkList;
