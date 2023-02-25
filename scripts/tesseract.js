import { Vector } from "./Vector.js";
import { Project3DPointTo2D } from './VectorUtils.js'

export class Tesseract {    
    #center = new Vector();
    #scale = new Vector(1, 1, 1, 1);
    #rotation = {
        XY: 0,
        XZ: 0,
        YZ: 0,
        WX: 0,
        WY: 0,
        WZ: 0
    };

    #baseVertices = [
        new Vector(0, 0, 0, 0),
        new Vector(0, 1, 0, 0),
        new Vector(1, 1, 0, 0),
        new Vector(1, 0, 0, 0),

        new Vector(0, 0, 1, 0),
        new Vector(0, 1, 1, 0),
        new Vector(1, 1, 1, 0),
        new Vector(1, 0, 1, 0),

        new Vector(0, 0, 0, 1),
        new Vector(0, 1, 0, 1),
        new Vector(1, 1, 0, 1),
        new Vector(1, 0, 0, 1),

        new Vector(0, 0, 1, 1),
        new Vector(0, 1, 1, 1),
        new Vector(1, 1, 1, 1),
        new Vector(1, 0, 1, 1)
    ];

    #calculatedVertices = Array(16).map(_ => new Vector());
    #hasChanges = true;

    constructor(center, scale) {
        this.#center = center;
        this.#scale = scale;

        // Normalize vertices
        for (let i = 0; i < 16; i++) {
            this.#baseVertices[i].x -= 0.5;
            this.#baseVertices[i].y -= 0.5;
            this.#baseVertices[i].z -= 0.5;
            this.#baseVertices[i].w -= 0.5;
        }
    }

    render(width, height) {
        if (this.#hasChanges) {
            this.#calculate(width, height);
            this.#hasChanges = false;
        }

        this.#drawEdges();
        this.#drawVertices();
    }

    setCenter(center) {
        this.#center = center;
        this.#hasChanges = true;
    }

    rotate(rotation) {
        if (rotation.XY != null) this.#rotation.XY += rotation.XY;
        if (rotation.XZ != null) this.#rotation.XZ += rotation.XZ;
        if (rotation.YZ != null) this.#rotation.YZ += rotation.YZ;
        if (rotation.WX != null) this.#rotation.WX += rotation.WX;
        if (rotation.WY != null) this.#rotation.WY += rotation.WY;
        if (rotation.WZ != null) this.#rotation.WZ += rotation.WZ;

        this.#hasChanges = true;
    }

    #calculate(width, height) {
        let cash = new Vector();

        for (let i = 0; i < 16; i++) {
            let vertex = this.#baseVertices[i].Copy();

            // Rotation actions
            cash.CopyFrom(vertex);
            vertex.x = cash.x * cos(this.#rotation.XY) - cash.y * sin(this.#rotation.XY);
            vertex.y = cash.x * sin(this.#rotation.XY) + cash.y * cos(this.#rotation.XY);

            cash.CopyFrom(vertex);
            vertex.x = cash.x * cos(this.#rotation.XZ) + cash.z * sin(this.#rotation.XZ);
            vertex.z = cash.x * (-sin(this.#rotation.XZ)) + cash.z * cos(this.#rotation.XZ);

            cash.CopyFrom(vertex);
            vertex.x = cash.x * cos(this.#rotation.WX) + cash.w * sin(this.#rotation.WX);
            vertex.w = cash.x * (-sin(this.#rotation.WX)) + cash.w * cos(this.#rotation.WX);

            cash.CopyFrom(vertex);
            vertex.y = cash.y * cos(this.#rotation.YZ) - cash.z * sin(this.#rotation.YZ);
            vertex.z = cash.y * sin(this.#rotation.YZ) + cash.z * cos(this.#rotation.YZ);

            cash.CopyFrom(vertex);
            vertex.y = cash.y * cos(this.#rotation.WY) + cash.w * sin(this.#rotation.WY);
            vertex.w = cash.y * (-sin(this.#rotation.WY)) + cash.w * cos(this.#rotation.WY);

            cash.CopyFrom(vertex);
            vertex.z = cash.z * cos(this.#rotation.WZ) - cash.w * sin(this.#rotation.WZ);
            vertex.w = cash.z * sin(this.#rotation.WZ) + cash.w * cos(this.#rotation.WZ);

            //Scaling
            vertex.Multipy(this.#scale);

            //Translating
            vertex.Plus(this.#center);

            // Save
            this.#calculatedVertices[i] = Project3DPointTo2D(vertex, this.#center, width, height);
        }
    }

    #drawVertices() {
        for (let vertex of this.#calculatedVertices) {
            circle(vertex.x, vertex.y, 5);
        }
    }

    #drawEdges() {
        for (let i = 0; i < 16; i++) {
            for (let j = (i < 1 ? 1 : i - 1); j < 16; j++) {
                if (!this.#areNeighbors(i, j)) {
                    continue;
                }

                let from = this.#calculatedVertices[i];
                let to = this.#calculatedVertices[j];

                line(from.x, from.y, to.x, to.y);
            }
        }
    }

    #areNeighbors(firstVertexIndex, secondVertexIndex) {
        let first = this.#baseVertices[firstVertexIndex].Copy();
        let second = this.#baseVertices[secondVertexIndex].Copy();

        first.Minus(second);

        return abs(first.Length() - 1) == 0;
    }
}