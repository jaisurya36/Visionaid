from ultralytics import YOLO
import cv2

model = YOLO("yolov8n.pt")

def detect_objects(image_path):

    results = model(image_path)

    detected_objects = []

    image = cv2.imread(image_path)

    for result in results:

        boxes = result.boxes

        for box in boxes:

            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0]
            )

            confidence = float(box.conf[0])

            class_id = int(box.cls[0])

            class_name = model.names[class_id]

            detected_objects.append(class_name)

            # Draw Rectangle
            cv2.rectangle(
                image,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2
            )

            # Label
            label = f"{class_name} {confidence:.2f}"

            cv2.putText(
                image,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2
            )

    output_path = f"uploads/detected_{image_path.split('/')[-1]}"

    cv2.imwrite(output_path, image)

    unique_objects = list(set(detected_objects))

    return unique_objects, output_path