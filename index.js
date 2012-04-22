// Creates an image with the specified histogram.

// Copyright 2012 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

// Describes the desired histogram of the image. Returns the value of the
// histogram at position "intesity" in [0, 255].
function histogram(intensity) {
    // Gaussian shape centered at (255 / 2):
    var a = 80, b = 255 / 2, c = 35;

    return a * Math.exp(-(intensity - b) * (intensity - b) / (2 * c * c));
}

function color(intensity) {
    return 'rgb(' + [intensity, intensity, intensity].join(',') + ')';
}

onload = function () {
    var canvas = document.getElementById('image'),
        context = canvas.getContext("2d"),
        intensity, rectX, rectY, length, 
        pos;

    canvas.width = 1024;
    canvas.height = 768;

    intensity = 0; // = x-value in the histogram
    pos = 0;
    while (pos < canvas.width * canvas.height) {
        length = Math.round(histogram(intensity));
        rectX = pos % canvas.width;
        rectY = Math.floor(pos / canvas.width);
        context.fillStyle = color(intensity);
        context.fillRect(rectX, rectY, length, 1);
        if (rectX + length > canvas.width) {
            // => continue on next line
            context.fillRect(0, rectY + 1, length - (canvas.width - rectX), 1);
        }
        intensity = (intensity + 1) % 256;
        pos += length;
    }

    window.location = canvas.toDataURL('image/png');
};
