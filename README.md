# BadukKids

BadukKids is an open source project to build a website. The goal of this website, is to teach very young children (age ~4 years old), the fundamental skills which are required to learn the game of go.

![image](https://user-images.githubusercontent.com/20482760/105848037-ba6cc100-5fde-11eb-88e1-58e74ec0ea2f.png)


# Use the website

An online version is deployed here: https://zbaduk.github.io/BadukKids/

In the configuration settings, there are 3 possible options:

1. to modify the theme. (the images which are used)
2. makes the stones run away, when there's only one liberty left.
3. playable points are shown by default, however there's also a mode that toggles them continuously (fading animation)

# Dependencies

BadukKids is built using Angular and Typescript.
It does not have a back-end.

# For Administrators

To make a new deployment:

    ng build --prod --base-href "https://zbaduk.github.io/BadukKids/"
    npx angular-cli-ghpages --dir=dist/BadukKids

# Credits

BadukKids was founded by ZBaduk, but is licensed under an MIT license.
For additional question or remarks, you can contact bram@zbaduk.com .
