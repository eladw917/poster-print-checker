import React, { useState, useCallback, useMemo } from 'react';
import { AlertCircle, Upload, RefreshCw, Info } from 'lucide-react';
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"


const COMMON_SIZES = [
  { name: '18" x 24"', width: 18, height: 24 },
  { name: '24" x 36"', width: 24, height: 36 },
  { name: '27" x 40"', width: 27, height: 40 },
  { name: '30" x 40"', width: 30, height: 40 },
  { name: '36" x 48"', width: 36, height: 48 },
].map(size => ({
  ...size,
  widthCm: Math.round(size.width * 2.54),
  heightCm: Math.round(size.height * 2.54)
}));

const PosterPrintChecker = () => {
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDPI, setSelectedDPI] = useState(300);
  const [selectedSize, setSelectedSize] = useState(null);
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [customUnit, setCustomUnit] = useState('inches');

  const analyzeImage = useCallback((file) => {
    const img = new Image();
    img.onload = function() {
      const width = this.width;
      const height = this.height;
      const aspectRatio = (width / height).toFixed(2);
      const megapixels = ((width * height) / 1000000).toFixed(2);

      setResult({
        width,
        height,
        aspectRatio,
        megapixels,
        suitable: parseFloat(megapixels) >= 6
      });
    }
    img.src = URL.createObjectURL(file);
    setPreviewUrl(img.src);
  }, []);

  const analysis = useMemo(() => {
    if (!result) return null;

    let width, height, dpi, maxDpi;

    if (selectedSize !== null) {
      if (selectedSize === 'custom') {
        width = parseFloat(customWidth);
        height = parseFloat(customHeight);
        if (isNaN(width) || isNaN(height)) return null;
        if (customUnit === 'cm') {
          width /= 2.54;
          height /= 2.54;
        }
      } else if (COMMON_SIZES[selectedSize]) {
        width = COMMON_SIZES[selectedSize].width;
        height = COMMON_SIZES[selectedSize].height;
      } else {
        return null;
      }
      maxDpi = Math.min(result.width / width, result.height / height);
      dpi = maxDpi; // Use max DPI when size is selected
    } else {
      dpi = selectedDPI;
      width = result.width / dpi;
      height = result.height / dpi;
      maxDpi = Math.min(result.width / width, result.height / height);
    }

    const widthCm = width * 2.54;
    const heightCm = height * 2.54;

    let quality;
    if (dpi >= 300) quality = "Excellent";
    else if (dpi >= 200) quality = "Good";
    else if (dpi >= 150) quality = "Fair";
    else quality = "Poor";

    const qualityScore = Math.min(100, Math.round((dpi / 300) * 100));

    return { 
      dpi: dpi.toFixed(0),
      maxDpi: maxDpi.toFixed(0),
      quality,
      qualityScore,
      width: width.toFixed(2),
      height: height.toFixed(2),
      widthCm: widthCm.toFixed(2),
      heightCm: heightCm.toFixed(2)
    };
  }, [result, selectedDPI, selectedSize, customWidth, customHeight, customUnit]);

  const handleFile = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      analyzeImage(file);
    } else {
      alert('Please upload a valid image file.');
    }
  }, [analyzeImage]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleReset = useCallback(() => {
    setResult(null);
    setPreviewUrl('');
    setSelectedDPI(300);
    setSelectedSize(null);
    setCustomWidth('');
    setCustomHeight('');
    setCustomUnit('inches');
    setIsDragging(false);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Poster Print Checker</h1>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
      <p className="mb-4">Upload an image to check if it's suitable for poster printing.</p>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-1">Drag and drop an image here, or click to select a file</p>
        </label>
      </div>

      {previewUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
          <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg" />
        </div>
      )}

      {result && (
        <>
          <div className={`mt-4 p-4 rounded-lg ${result.suitable ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="flex items-center">
              <AlertCircle className={`mr-2 h-4 w-4 ${result.suitable ? 'text-green-500' : 'text-red-500'}`} />
              <p className="text-sm">
                {result.suitable 
                  ? "This image is suitable for poster printing!" 
                  : "This image might not be suitable for large poster prints. Consider using a higher resolution image."}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Image Analysis</h2>
            <p>Dimensions: {result.width}x{result.height} pixels</p>
            <p>Aspect Ratio: {result.aspectRatio}</p>
            <p>Megapixels: {result.megapixels}</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Poster Print Calculator</h3>
            
            <div className="mb-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Label className="flex items-center">
                DPI:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-1" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>DPI (Dots Per Inch) affects print quality. Higher DPI generally means better quality.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              {[150, 300, 600].map((dpi) => (
                <Button 
                  key={dpi}
                  variant={selectedDPI === dpi && selectedSize === null ? "default" : "outline"}
                  size="xs"
                  onClick={() => {
                    setSelectedDPI(dpi);
                    setSelectedSize(null);
                  }}
                  style={{ flex: '1', flexDirection: 'column', alignItems: 'center' }}
                  className={`text-xs border border-black rounded-md
                    ${selectedDPI === dpi && selectedSize === null 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black'}`}
                >
                  <div>{dpi}</div>
                  <div>{dpi === 150 ? "(Standard)" : dpi === 300 ? "(High)" : "(Ultra-High)"}</div>
                </Button>
              ))}
              {analysis && (
                <Button 
                  variant={selectedSize !== null ? "default" : "outline"}
                  size="xs"
                  onClick={() => {
                    setSelectedSize(selectedSize === null ? 0 : selectedSize);
                    setSelectedDPI(parseInt(analysis.maxDpi));
                  }}
                  style={{ flex: '1', flexDirection: 'column', alignItems: 'center' }}
                  className={`text-xs border border-black rounded-md
                    ${selectedSize !== null 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black'}`}
                >
                  <div>{analysis.maxDpi}</div>
                  <div>{analysis.maxDpi ? "(Max)" : 'Max DPI'}</div>
                </Button>
              )}
            </div>

            <div className="mb-4">
              <Label>Select Poster Size:</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {COMMON_SIZES.map((size, index) => (
                  <Button
                    key={size.name}
                    variant={selectedSize === index ? "default" : "outline"}
                    size="xs"
                    onClick={() => setSelectedSize(index)}
                    className={`text-xs border border-black rounded-md
                      ${selectedSize === index 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black'}`}
                  >
                    <span className="text-left">
                      {size.width}" x {size.height}" ({size.widthCm} cm x {size.heightCm} cm)
                    </span>
                  </Button>
                ))}
                <Button
                  variant={selectedSize === 'custom' ? "default" : "outline"}
                  size="xs"
                  onClick={() => setSelectedSize('custom')}
                  className={`text-xs border border-black rounded-md
                    ${selectedSize === 'custom' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black'}`}
                >
                  Custom
                </Button>
              </div>
            </div>

            {selectedSize === 'custom' && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Input 
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      placeholder="Width"
                    />
                  </div>
                  <div>
                    <Input 
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      placeholder="Height"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button 
                    variant={customUnit === 'inches' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCustomUnit('inches')}
                  >
                    Inches
                  </Button>
                  <Button 
                    variant={customUnit === 'cm' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCustomUnit('cm')}
                  >
                    Centimeters
                  </Button>
                </div>
              </div>
            )}
            {analysis && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold mb-2">Analysis Results:</h4>
                <p>Print Size: {analysis.width}" x {analysis.height}" ({analysis.widthCm} cm x {analysis.heightCm} cm)</p>
                <p>Effective DPI: {analysis.dpi}</p>
                <div className="mt-2">
                  <Label>Print Quality:</Label>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{width: `${analysis.qualityScore}%`}}
                      ></div>
                    </div>
                    <span>{analysis.quality} ({analysis.qualityScore}%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PosterPrintChecker;