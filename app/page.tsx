"use client";
import { useState } from "react";

import { randomString, urlPath } from "@/lib/helpers";
import useHomeHooks from "@/hooks/home.hooks";
import ButtonShorten from "@/components/home/ButtonShorten";
import Navigation from "@/components/Navigation";
import GeneratedLink from "@/components/home/GeneratedLink";

export default function URLShortenerApp() {
  const { isConnected, signer, chainId, status, setStatus } =
    useHomeHooks();

  const [shortCode, setShortCode] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  return (
    <div>
      <Navigation />
      {!generatedLink ? (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
            <h1 className="text-4xl font-bold mb-6">
              Simplify Your Links
              <br />
              Speed Up Your Access!
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Shorten your URLs and experience the ease of fast sharing using
              blockchain technology.
            </p>
          </div>
          <div className="flex justify-center mx-4 lg:mx-0">
            <div className="rounded-xl w-full max-w-3xl space-y-8 border border-gray-dark-4 lg:bg-gray-dark-2 px-8 lg:px-10 py-8 shadow-xl lg:shadow-2xl">
              <div className="space-y-4">
                <div>
                  <p className="font-bold mb-4 lg:mb-2">Shorten a long URL</p>
                  <input
                    id="longUrl"
                    type="text"
                    placeholder="Long URL (e.g. https://www.google.com/)"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className={
                      "py-2 rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-sm " +
                      "text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent lg:text-base"
                    }
                  />
                </div>
                <div>
                  <p className="font-bold mb-4 lg:mb-2">Customize your link</p>
                  <div className="relative flex gap-3">
                    {/* <div> */}
                    <input
                      placeholder={urlPath("cuty.im", chainId)}
                      className={`bg-muted px-3 py-2 text-center ` +
                        "font-normal w-22 text-sm " +
                        "lg:font-semibold lg:w-xs lg:text-base"
                      }
                      disabled={true}
                    />
                    {/* </div> */}
                    <button
                      className={
                        "!absolute right-0 bottom-12 lg:bottom-0 lg:right-1 lg:top-1 lg:z-10 select-none rounded-lg bg-blue-500 " +
                        "py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white " +
                        `transition-all ${
                          isConnected &&
                          "cursor-pointer hover:scale-105 hover:bg-blue-600 focus:opacity-[0.85] focus:shadow-none active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                        }`
                      }
                      // className={
                      //   "!absolute right-0 bottom-12 lg:right-1 lg:top-1 z-10 select-none rounded-lg bg-blue-500 " +
                      //   "py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white " +
                      //   `transition-all ${
                      //     isConnected &&
                      //     "cursor-pointer hover:scale-105 hover:bg-blue-600 focus:opacity-[0.85] focus:shadow-none active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                      //   }`
                      // }
                      type="button"
                      data-ripple-light="true"
                      disabled={!isConnected}
                      onClick={() => setShortCode(randomString(5))}
                    >
                      Random
                    </button>
                    <input
                      id="shortCode"
                      type="text"
                      placeholder="Short code (e.g. abc123)"
                      value={shortCode}
                      onChange={(e) => setShortCode(e.target.value)}
                      className={
                        `rounded-md w-full border text-sm border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent ` +
                        `lg:text-base`
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <ButtonShorten
                  isConnected={isConnected}
                  status={status}
                  setStatus={setStatus}
                  signer={signer}
                  shortCode={shortCode}
                  longUrl={longUrl}
                  setGeneratedLink={setGeneratedLink}
                  chainId={chainId}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <GeneratedLink generatedLink={generatedLink} longUrl={longUrl} />
      )}
    </div>
  );
}