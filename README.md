# Action REAction (AREA)
Dans le cadre de notre 3ème année l'AREA est un projet Epitech compris dans le module de développement web.

## SOMMAIRE
- **Information général**
- **Environnement général**
 - **Graphique technique**

## INFORMATION GÉNÉRAL

- **Taille du groupe** : 1
- **Répertoire** : B-YEP-500-LIL-5-1-area-theo.selosse
 - **Langage** : Node.js, Express.js, React.js
 - **Compilation** : docker-compose build && docker-compose up

## ENVIRONNEMENT GÉNÉRAL

- **Environnement technique** :

```mermaid
graph LR
B --> C[Client web]
B[Serveur REST API] --> D{API externes}
C --> B
B --> A((MongoDB))
```

## GRAPHIQUE TECHNIQUE

### Front
```mermaid
graph LR
A((AREA)) --> C
C[App web] --> D{React}
```

### Back
```mermaid
graph LR
A((AREA)) --> C
A --> F[Api]
F --> G{Node.js, Express.js}
C[App web] --> D{React}
```
# Installation
- Prérequis.
  > Docker

- Etape 1.
  > docker-compose up && docker-compose build