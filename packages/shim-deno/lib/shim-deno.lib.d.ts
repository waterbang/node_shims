// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

/// <reference types="node" />

import { URL } from "url";
import { ReadableStream, WritableStream } from "node:stream/web";

/**
 * EventTarget is a DOM interface implemented by objects that can receive events
 * and may have listeners for them.
 *
 * @category DOM Events
 */
declare class EventTarget {
  /**
   * Appends an event listener for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this
   * can be a boolean, in which case the method behaves exactly as if the value
   * was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being invoked
   * when the event's eventPhase attribute value is BUBBLING_PHASE. When false
   * (or not present), callback will not be invoked when event's eventPhase
   * attribute value is CAPTURING_PHASE. Either way, callback will be invoked if
   * event's eventPhase attribute value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will not
   * cancel the event by invoking preventDefault(). This is used to enable
   * performance optimizations described in § 2.8 Observing event listeners.
   *
   * When set to true, options's once indicates that the callback will only be
   * invoked once after which the event listener will be removed.
   *
   * The event listener is appended to target's event listener list and is not
   * appended if it has the same type, callback, and capture.
   */
  addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  /**
   * Dispatches a synthetic event event to target and returns true if either
   * event's cancelable attribute value is false or its preventDefault() method
   * was not invoked, and false otherwise.
   */
  dispatchEvent(event: Event): boolean;
  /**
   * Removes the event listener in target's event listener list with the same
   * type, callback, and options.
   */
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

/**
 * An event which takes place in the DOM.
 *
 * @category DOM Events
 */
declare class Event {
  /**
   * Returns true or false depending on how event was initialized. True if
   * event goes through its target's ancestors in reverse tree order, and
   * false otherwise.
   */
  readonly bubbles: boolean;
  cancelBubble: boolean;
  /**
   * Returns true or false depending on how event was initialized. Its return
   * value does not always carry meaning, but true can indicate that part of the
   * operation during which event was dispatched, can be canceled by invoking
   * the preventDefault() method.
   */
  readonly cancelable: boolean;
  /**
   * Returns true or false depending on how event was initialized. True if
   * event invokes listeners past a ShadowRoot node that is the root of its
   * target, and false otherwise.
   */
  readonly composed: boolean;
  /**
   * Returns the object whose event listener's callback is currently being
   * invoked.
   */
  readonly currentTarget: EventTarget | null;
  /**
   * Returns true if preventDefault() was invoked successfully to indicate
   * cancellation, and false otherwise.
   */
  readonly defaultPrevented: boolean;
  /**
   * Returns the event's phase, which is one of NONE, CAPTURING_PHASE,
   * AT_TARGET, and BUBBLING_PHASE.
   */
  readonly eventPhase: number;
  /**
   * Returns true if event was dispatched by the user agent, and false
   * otherwise.
   */
  readonly isTrusted: boolean;
  /** Returns the object to which event is dispatched (its target). */
  readonly target: EventTarget | null;
  /**
   * Returns the event's timestamp as the number of milliseconds measured
   * relative to the time origin.
   */
  readonly timeStamp: number;
  /** Returns the type of event, e.g. "click", "hashchange", or "submit". */
  readonly type: string;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly NONE: number;
  constructor(type: string, eventInitDict?: EventInit);
  /**
   * Returns the invocation target objects of event's path (objects on which
   * listeners will be invoked), except for any nodes in shadow trees of which
   * the shadow root's mode is "closed" that are not reachable from event's
   * currentTarget.
   */
  composedPath(): EventTarget[];
  /**
   * If invoked when the cancelable attribute value is true, and while
   * executing a listener for the event with passive set to false, signals to
   * the operation that caused event to be dispatched that it needs to be
   * canceled.
   */
  preventDefault(): void;
  /**
   * Invoking this method prevents event from reaching any registered event
   * listeners after the current one finishes running and, when dispatched in a
   * tree, also prevents event from reaching any other objects.
   */
  stopImmediatePropagation(): void;
  /**
   * When dispatched in a tree, invoking this method prevents event from
   * reaching any objects other than the current object.
   */
  stopPropagation(): void;
}

/** @category DOM Events */
interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

/** @category DOM Events */
interface EventListenerOptions {
  capture?: boolean;
}

/** @category DOM Events */
interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
}

/** @category DOM Events */
interface EventListener {
  (evt: Event): void | Promise<void>;
}

/** @category DOM Events */
interface EventListenerObject {
  handleEvent(evt: Event): void | Promise<void>;
}

/** @category DOM Events */
declare type EventListenerOrEventListenerObject = | EventListener
    | EventListenerObject;

export declare namespace Deno {
  export const File: typeof FsFile;

  export class FsFile implements Deno.FsFile {
    readonly rid: number;
    constructor(rid: number);
    get readable(): ReadableStream<Uint8Array>;
    get writable(): WritableStream<Uint8Array>;
    write(p: Uint8Array): Promise<number>;
    writeSync(p: Uint8Array): number;
    truncate(len?: number): Promise<void>;
    truncateSync(len?: number): void;
    read(p: Uint8Array): Promise<number | null>;
    readSync(p: Uint8Array): number | null;
    seek(_offset: number, _whence: Deno.SeekMode): Promise<number>;
    seekSync(_offset: number, _whence: Deno.SeekMode): number;
    stat(): Promise<Deno.FileInfo>;
    statSync(): Deno.FileInfo;
    close(): void;
  }

  export class Permissions implements Deno.Permissions {
    query(desc: Deno.PermissionDescriptor): Promise<PermissionStatus>;
    querySync(_desc: Deno.PermissionDescriptor): PermissionStatus;
    revoke(desc: Deno.PermissionDescriptor): Promise<PermissionStatus>;
    revokeSync(_desc: Deno.PermissionDescriptor): PermissionStatus;
    request(desc: Deno.PermissionDescriptor): Promise<PermissionStatus>;
    requestSync(desc: Deno.PermissionDescriptor): PermissionStatus;
  }

  export class PermissionStatus extends EventTarget implements Deno.PermissionStatus {
    readonly state: Deno.PermissionState;
    onchange: ((this: PermissionStatus, ev: Event) => any) | null;
  }

  export enum SeekMode {
    Start = 0,
    Current = 1,
    End = 2
  }

  /**
   * The `tty.isatty()` method returns `true` if the given `fd` is associated with
   * a TTY and `false` if it is not, including whenever `fd` is not a non-negative
   * integer.
   * @since v0.5.8
   * @param fd A numeric file descriptor
   */
  export function isatty(fd: number): boolean;
  /**
   * Change the current working directory to the specified path.
   *
   * ```ts
   * Deno.chdir("/home/userA");
   * Deno.chdir("../userB");
   * Deno.chdir("C:\\Program Files (x86)\\Java");
   * ```
   *
   * Throws {@linkcode Deno.errors.NotFound} if directory not found.
   *
   * Throws {@linkcode Deno.errors.PermissionDenied} if the user does not have
   * operating system file access rights.
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category Runtime Environment
   */
  export function chdir(directory: string | URL): void;
  /**
   * Changes the permission of a specific file/directory of specified path.
   * Ignores the process's umask.
   *
   * ```ts
   * await Deno.chmod("/path/to/file", 0o666);
   * ```
   *
   * The mode is a sequence of 3 octal numbers. The first/left-most number
   * specifies the permissions for the owner. The second number specifies the
   * permissions for the group. The last/right-most number specifies the
   * permissions for others. For example, with a mode of 0o764, the owner (7)
   * can read/write/execute, the group (6) can read/write and everyone else (4)
   * can read only.
   *
   * | Number | Description |
   * | ------ | ----------- |
   * | 7      | read, write, and execute |
   * | 6      | read and write |
   * | 5      | read and execute |
   * | 4      | read only |
   * | 3      | write and execute |
   * | 2      | write only |
   * | 1      | execute only |
   * | 0      | no permission |
   *
   * NOTE: This API currently throws on Windows
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function chmod(path: string | URL, mode: number): Promise<void>;
  /**
   * Synchronously changes the permission of a specific file/directory of
   * specified path. Ignores the process's umask.
   *
   * ```ts
   * Deno.chmodSync("/path/to/file", 0o666);
   * ```
   *
   * For a full description, see {@linkcode Deno.chmod}.
   *
   * NOTE: This API currently throws on Windows
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function chmodSync(path: string | URL, mode: number): void;
  /**
   * Change owner of a regular file or directory.
   *
   * This functionality is not available on Windows.
   *
   * ```ts
   * await Deno.chown("myFile.txt", 1000, 1002);
   * ```
   *
   * Requires `allow-write` permission.
   *
   * Throws Error (not implemented) if executed on Windows.
   *
   * @tags allow-write
   * @category File System
   * @param path path to the file
   * @param uid user id (UID) of the new owner, or `null` for no change
   * @param gid group id (GID) of the new owner, or `null` for no change
   */
  export function chown(path: string | URL, uid: number | null, gid: number | null): Promise<void>;
  /**
   * Synchronously change owner of a regular file or directory.
   *
   * This functionality is not available on Windows.
   *
   * ```ts
   * Deno.chownSync("myFile.txt", 1000, 1002);
   * ```
   *
   * Requires `allow-write` permission.
   *
   * Throws Error (not implemented) if executed on Windows.
   *
   * @tags allow-write
   * @category File System
   * @param path path to the file
   * @param uid user id (UID) of the new owner, or `null` for no change
   * @param gid group id (GID) of the new owner, or `null` for no change
   */
  export function chownSync(path: string | URL, uid: number | null, gid: number | null): void;
  /**
   * Close the given resource ID (`rid`) which has been previously opened, such
   * as via opening or creating a file. Closing a file when you are finished
   * with it is important to avoid leaking resources.
   *
   * ```ts
   * const file = await Deno.open("my_file.txt");
   * // do work with "file" object
   * Deno.close(file.rid);
   * ```
   *
   * @category I/O
   */
  export function close(rid: number): void;
  /**
   * Connects to the hostname (default is "127.0.0.1") and port on the named
   * transport (default is "tcp"), and resolves to the connection (`Conn`).
   *
   * ```ts
   * const conn1 = await Deno.connect({ port: 80 });
   * const conn2 = await Deno.connect({ hostname: "192.0.2.1", port: 80 });
   * const conn3 = await Deno.connect({ hostname: "[2001:db8::1]", port: 80 });
   * const conn4 = await Deno.connect({ hostname: "golang.org", port: 80, transport: "tcp" });
   * ```
   *
   * Requires `allow-net` permission for "tcp".
   *
   * @tags allow-net
   * @category Network
   */
  export function connect(options: ConnectOptions): Promise<TcpConn>;
  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * Connects to the hostname (default is "127.0.0.1") and port on the named
   * transport (default is "tcp"), and resolves to the connection (`Conn`).
   *
   * ```ts
   * const conn1 = await Deno.connect({ port: 80 });
   * const conn2 = await Deno.connect({ hostname: "192.0.2.1", port: 80 });
   * const conn3 = await Deno.connect({ hostname: "[2001:db8::1]", port: 80 });
   * const conn4 = await Deno.connect({ hostname: "golang.org", port: 80, transport: "tcp" });
   * const conn5 = await Deno.connect({ path: "/foo/bar.sock", transport: "unix" });
   * ```
   *
   * Requires `allow-net` permission for "tcp" and `allow-read` for "unix".
   *
   * @tags allow-net, allow-read
   * @category Network
   */
  export function connect(options: ConnectOptions): Promise<TcpConn>;
  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * Connects to the hostname (default is "127.0.0.1") and port on the named
   * transport (default is "tcp"), and resolves to the connection (`Conn`).
   *
   * ```ts
   * const conn1 = await Deno.connect({ port: 80 });
   * const conn2 = await Deno.connect({ hostname: "192.0.2.1", port: 80 });
   * const conn3 = await Deno.connect({ hostname: "[2001:db8::1]", port: 80 });
   * const conn4 = await Deno.connect({ hostname: "golang.org", port: 80, transport: "tcp" });
   * const conn5 = await Deno.connect({ path: "/foo/bar.sock", transport: "unix" });
   * ```
   *
   * Requires `allow-net` permission for "tcp" and `allow-read` for "unix".
   *
   * @tags allow-net, allow-read
   * @category Network
   */
  export function connect(options: UnixConnectOptions): Promise<UnixConn>;
  /**
   * Establishes a secure connection over TLS (transport layer security) using
   * an optional cert file, hostname (default is "127.0.0.1") and port.  The
   * cert file is optional and if not included Mozilla's root certificates will
   * be used (see also https://github.com/ctz/webpki-roots for specifics)
   *
   * ```ts
   * const caCert = await Deno.readTextFile("./certs/my_custom_root_CA.pem");
   * const conn1 = await Deno.connectTls({ port: 80 });
   * const conn2 = await Deno.connectTls({ caCerts: [caCert], hostname: "192.0.2.1", port: 80 });
   * const conn3 = await Deno.connectTls({ hostname: "[2001:db8::1]", port: 80 });
   * const conn4 = await Deno.connectTls({ caCerts: [caCert], hostname: "golang.org", port: 80});
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function connectTls(options: ConnectTlsOptions): Promise<TlsConn>;
  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * Create a TLS connection with an attached client certificate.
   *
   * ```ts
   * const conn = await Deno.connectTls({
   *   hostname: "deno.land",
   *   port: 443,
   *   certChain: "---- BEGIN CERTIFICATE ----\n ...",
   *   privateKey: "---- BEGIN PRIVATE KEY ----\n ...",
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function connectTls(options: ConnectTlsOptions): Promise<TlsConn>;
  /**
   * Copies from `src` to `dst` until either EOF (`null`) is read from `src` or
   * an error occurs. It resolves to the number of bytes copied or rejects with
   * the first error encountered while copying.
   *
   * @deprecated Use
   * [`copy`](https://deno.land/std/streams/copy.ts?s=copy) from
   * [`std/streams/copy.ts`](https://deno.land/std/streams/copy.ts)
   * instead. `Deno.copy` will be removed in the future.
   * @category I/O
   * @param src The source to copy from
   * @param dst The destination to copy to
   * @param options Can be used to tune size of the buffer. Default size is 32kB
   */
  export function copy(src: Reader, dst: Writer, options?: { bufSize?: number }): Promise<number>;
  /**
   * Copies the contents and permissions of one file to another specified path,
   * by default creating a new file if needed, else overwriting. Fails if target
   * path is a directory or is unwritable.
   *
   * ```ts
   * await Deno.copyFile("from.txt", "to.txt");
   * ```
   *
   * Requires `allow-read` permission on `fromPath`.
   *
   * Requires `allow-write` permission on `toPath`.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function copyFile(fromPath: string | URL, toPath: string | URL): Promise<void>;
  /**
   * Synchronously copies the contents and permissions of one file to another
   * specified path, by default creating a new file if needed, else overwriting.
   * Fails if target path is a directory or is unwritable.
   *
   * ```ts
   * Deno.copyFileSync("from.txt", "to.txt");
   * ```
   *
   * Requires `allow-read` permission on `fromPath`.
   *
   * Requires `allow-write` permission on `toPath`.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function copyFileSync(fromPath: string | URL, toPath: string | URL): void;
  /**
   * Creates a file if none exists or truncates an existing file and resolves to
   *  an instance of {@linkcode Deno.FsFile}.
   *
   * ```ts
   * const file = await Deno.create("/foo/bar.txt");
   * ```
   *
   * Requires `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function create(path: string | URL): Promise<FsFile>;
  /**
   * Creates a file if none exists or truncates an existing file and returns
   *  an instance of {@linkcode Deno.FsFile}.
   *
   * ```ts
   * const file = Deno.createSync("/foo/bar.txt");
   * ```
   *
   * Requires `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function createSync(path: string | URL): FsFile;
  /**
   * Return a string representing the current working directory.
   *
   * If the current directory can be reached via multiple paths (due to symbolic
   * links), `cwd()` may return any one of them.
   *
   * ```ts
   * const currentWorkingDirectory = Deno.cwd();
   * ```
   *
   * Throws {@linkcode Deno.errors.NotFound} if directory not available.
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category Runtime Environment
   */
  export function cwd(): string;
  /**
   * Returns the path to the current deno executable.
   *
   * ```ts
   * console.log(Deno.execPath());  // e.g. "/home/alice/.local/bin/deno"
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category Runtime Environment
   */
  export function execPath(): string;
  /**
   * Exit the Deno process with optional exit code.
   *
   * If no exit code is supplied then Deno will exit with return code of `0`.
   *
   * In worker contexts this is an alias to `self.close();`.
   *
   * ```ts
   * Deno.exit(5);
   * ```
   *
   * @category Runtime Environment
   */
  export function exit(code?: number): never;
  /**
   * Flushes any pending data operations of the given file stream to disk.
   *  ```ts
   * const file = await Deno.open(
   *   "my_file.txt",
   *   { read: true, write: true, create: true },
   * );
   * await Deno.write(file.rid, new TextEncoder().encode("Hello World"));
   * await Deno.fdatasync(file.rid);
   * console.log(new TextDecoder().decode(await Deno.readFile("my_file.txt"))); // Hello World
   * ```
   *
   * @category I/O
   */
  export function fdatasync(rid: number): Promise<void>;
  /**
   * Synchronously flushes any pending data operations of the given file stream
   * to disk.
   *
   *  ```ts
   * const file = Deno.openSync(
   *   "my_file.txt",
   *   { read: true, write: true, create: true },
   * );
   * Deno.writeSync(file.rid, new TextEncoder().encode("Hello World"));
   * Deno.fdatasyncSync(file.rid);
   * console.log(new TextDecoder().decode(Deno.readFileSync("my_file.txt"))); // Hello World
   * ```
   *
   * @category I/O
   */
  export function fdatasyncSync(rid: number): void;
  /**
   * Returns a `Deno.FileInfo` for the given file stream.
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   *
   * const file = await Deno.open("file.txt", { read: true });
   * const fileInfo = await Deno.fstat(file.rid);
   * assert(fileInfo.isFile);
   * ```
   *
   * @category File System
   */
  export function fstat(rid: number): Promise<FileInfo>;
  /**
   * Synchronously returns a {@linkcode Deno.FileInfo} for the given file
   * stream.
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   *
   * const file = Deno.openSync("file.txt", { read: true });
   * const fileInfo = Deno.fstatSync(file.rid);
   * assert(fileInfo.isFile);
   * ```
   *
   * @category File System
   */
  export function fstatSync(rid: number): FileInfo;
  /**
   * Flushes any pending data and metadata operations of the given file stream
   * to disk.
   *
   * ```ts
   * const file = await Deno.open(
   *   "my_file.txt",
   *   { read: true, write: true, create: true },
   * );
   * await Deno.write(file.rid, new TextEncoder().encode("Hello World"));
   * await Deno.ftruncate(file.rid, 1);
   * await Deno.fsync(file.rid);
   * console.log(new TextDecoder().decode(await Deno.readFile("my_file.txt"))); // H
   * ```
   *
   * @category I/O
   */
  export function fsync(rid: number): Promise<void>;
  /**
   * Synchronously flushes any pending data and metadata operations of the given
   * file stream to disk.
   *
   * ```ts
   * const file = Deno.openSync(
   *   "my_file.txt",
   *   { read: true, write: true, create: true },
   * );
   * Deno.writeSync(file.rid, new TextEncoder().encode("Hello World"));
   * Deno.ftruncateSync(file.rid, 1);
   * Deno.fsyncSync(file.rid);
   * console.log(new TextDecoder().decode(Deno.readFileSync("my_file.txt"))); // H
   * ```
   *
   * @category I/O
   */
  export function fsyncSync(rid: number): void;
  /**
   * Truncates or extends the specified file stream, to reach the specified
   * `len`.
   *
   * If `len` is not specified then the entire file contents are truncated as if
   * `len` was set to `0`.
   *
   * If the file previously was larger than this new length, the extra data is
   * lost.
   *
   * If the file previously was shorter, it is extended, and the extended part
   * reads as null bytes ('\0').
   *
   * ### Truncate the entire file
   *
   * ```ts
   * const file = await Deno.open(
   *   "my_file.txt",
   *   { read: true, write: true, create: true }
   * );
   * await Deno.ftruncate(file.rid);
   * ```
   *
   * ### Truncate part of the file
   *
   * ```ts
   * const file = await Deno.open(
   *   "my_file.txt",
   *   { read: true, write: true, create: true }
   * );
   * await Deno.write(file.rid, new TextEncoder().encode("Hello World"));
   * await Deno.ftruncate(file.rid, 7);
   * const data = new Uint8Array(32);
   * await Deno.read(file.rid, data);
   * console.log(new TextDecoder().decode(data)); // Hello W
   * ```
   *
   * @category File System
   */
  export function ftruncate(rid: number, len?: number): Promise<void>;
  /**
   * Synchronously truncates or extends the specified file stream, to reach the
   * specified `len`.
   *
   * If `len` is not specified then the entire file contents are truncated as if
   * `len` was set to `0`.
   *
   * If the file previously was larger than this new length, the extra data is
   * lost.
   *
   * If the file previously was shorter, it is extended, and the extended part
   * reads as null bytes ('\0').
   *
   * ### Truncate the entire file
   *
   * ```ts
   * const file = Deno.openSync(
   *   "my_file.txt",
   *   { read: true, write: true, truncate: true, create: true }
   * );
   * Deno.ftruncateSync(file.rid);
   * ```
   *
   * ### Truncate part of the file
   *
   * ```ts
   * const file = Deno.openSync(
   *  "my_file.txt",
   *  { read: true, write: true, create: true }
   * );
   * Deno.writeSync(file.rid, new TextEncoder().encode("Hello World"));
   * Deno.ftruncateSync(file.rid, 7);
   * Deno.seekSync(file.rid, 0, Deno.SeekMode.Start);
   * const data = new Uint8Array(32);
   * Deno.readSync(file.rid, data);
   * console.log(new TextDecoder().decode(data)); // Hello W
   * ```
   *
   * @category File System
   */
  export function ftruncateSync(rid: number, len?: number): void;
  /**
   * Returns the group id of the process on POSIX platforms. Returns null on windows.
   *
   * ```ts
   * console.log(Deno.gid());
   * ```
   *
   * Requires `allow-sys` permission.
   *
   * @tags allow-sys
   * @category Runtime Environment
   */
  export function gid(): number | null;
  /**
   * Get the `hostname` of the machine the Deno process is running on.
   *
   * ```ts
   * console.log(Deno.hostname());
   * ```
   *
   * Requires `allow-sys` permission.
   *
   * @tags allow-sys
   * @category Runtime Environment
   */
  export function hostname(): string;
  /**
   * Converts the input into a string that has the same format as printed by
   * `console.log()`.
   *
   * ```ts
   * const obj = {
   *   a: 10,
   *   b: "hello",
   * };
   * const objAsString = Deno.inspect(obj); // { a: 10, b: "hello" }
   * console.log(obj);  // prints same value as objAsString, e.g. { a: 10, b: "hello" }
   * ```
   *
   * A custom inspect functions can be registered on objects, via the symbol
   * `Symbol.for("Deno.customInspect")`, to control and customize the output
   * of `inspect()` or when using `console` logging:
   *
   * ```ts
   * class A {
   *   x = 10;
   *   y = "hello";
   *   [Symbol.for("Deno.customInspect")]() {
   *     return `x=${this.x}, y=${this.y}`;
   *   }
   * }
   *
   * const inStringFormat = Deno.inspect(new A()); // "x=10, y=hello"
   * console.log(inStringFormat);  // prints "x=10, y=hello"
   * ```
   *
   * A depth can be specified by using the `depth` option:
   *
   * ```ts
   * Deno.inspect({a: {b: {c: {d: 'hello'}}}}, {depth: 2}); // { a: { b: [Object] } }
   * ```
   *
   * @category Console and Debugging
   */
  export function inspect(value: unknown, options?: InspectOptions): string;
  /**
   * Send a signal to process under given `pid`. The value and meaning of the
   * `signal` to the process is operating system and process dependant.
   * {@linkcode Signal} provides the most common signals. Default signal
   * is `"SIGTERM"`.
   *
   * The term `kill` is adopted from the UNIX-like command line command `kill`
   * which also signals processes.
   *
   * If `pid` is negative, the signal will be sent to the process group
   * identified by `pid`. An error will be thrown if a negative `pid` is used on
   * Windows.
   *
   * ```ts
   * const p = Deno.run({
   *   cmd: ["sleep", "10000"]
   * });
   *
   * Deno.kill(p.pid, "SIGINT");
   * ```
   *
   * Requires `allow-run` permission.
   *
   * @tags allow-run
   * @category Sub Process
   */
  export function kill(pid: number, signo?: Signal): void;
  /**
   * Creates `newpath` as a hard link to `oldpath`.
   *
   * ```ts
   * await Deno.link("old/name", "new/name");
   * ```
   *
   * Requires `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function link(oldpath: string, newpath: string): Promise<void>;
  /**
   * Synchronously creates `newpath` as a hard link to `oldpath`.
   *
   * ```ts
   * Deno.linkSync("old/name", "new/name");
   * ```
   *
   * Requires `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function linkSync(oldpath: string, newpath: string): void;
  /**
   * Listen announces on the local transport address.
   *
   * ```ts
   * const listener1 = Deno.listen({ port: 80 })
   * const listener2 = Deno.listen({ hostname: "192.0.2.1", port: 80 })
   * const listener3 = Deno.listen({ hostname: "[2001:db8::1]", port: 80 });
   * const listener4 = Deno.listen({ hostname: "golang.org", port: 80, transport: "tcp" });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function listen(options: TcpListenOptions & { transport?: "tcp" }): Listener;
  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * Listen announces on the local transport address.
   *
   * ```ts
   * const listener = Deno.listen({ path: "/foo/bar.sock", transport: "unix" })
   * ```
   *
   * Requires `allow-read` and `allow-write` permission.
   *
   * @tags allow-read, allow-write
   * @category Network
   */
  export function listen(options: UnixListenOptions & { transport: "unix" }): Listener;
  /**
   * Listen announces on the local transport address over TLS (transport layer
   * security).
   *
   * ```ts
   * const lstnr = Deno.listenTls({ port: 443, certFile: "./server.crt", keyFile: "./server.key" });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function listenTls(options: ListenTlsOptions): TlsListener;
  /**
   * Returns an array containing the 1, 5, and 15 minute load averages. The
   * load average is a measure of CPU and IO utilization of the last one, five,
   * and 15 minute periods expressed as a fractional number.  Zero means there
   * is no load. On Windows, the three values are always the same and represent
   * the current load, not the 1, 5 and 15 minute load averages.
   *
   * ```ts
   * console.log(Deno.loadavg());  // e.g. [ 0.71, 0.44, 0.44 ]
   * ```
   *
   * Requires `allow-sys` permission.
   *
   * On Windows there is no API available to retrieve this information and this method returns `[ 0, 0, 0 ]`.
   *
   * @tags allow-sys
   * @category Observability
   */
  export function loadavg(): number[];
  /**
   * Resolves to a {@linkcode Deno.FileInfo} for the specified `path`. If
   * `path` is a symlink, information for the symlink will be returned instead
   * of what it points to.
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   * const fileInfo = await Deno.lstat("hello.txt");
   * assert(fileInfo.isFile);
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function lstat(path: string | URL): Promise<FileInfo>;
  /**
   * Synchronously returns a {@linkcode Deno.FileInfo} for the specified
   * `path`. If `path` is a symlink, information for the symlink will be
   * returned instead of what it points to.
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   * const fileInfo = Deno.lstatSync("hello.txt");
   * assert(fileInfo.isFile);
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function lstatSync(path: string | URL): FileInfo;
  /**
   * Creates a new temporary directory in the default directory for temporary
   * files, unless `dir` is specified. Other optional options include
   * prefixing and suffixing the directory name with `prefix` and `suffix`
   * respectively.
   *
   * This call resolves to the full path to the newly created directory.
   *
   * Multiple programs calling this function simultaneously will create different
   * directories. It is the caller's responsibility to remove the directory when
   * no longer needed.
   *
   * ```ts
   * const tempDirName0 = await Deno.makeTempDir();  // e.g. /tmp/2894ea76
   * const tempDirName1 = await Deno.makeTempDir({ prefix: 'my_temp' }); // e.g. /tmp/my_temp339c944d
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function makeTempDir(options?: MakeTempOptions): Promise<string>;
  /**
   * Synchronously creates a new temporary directory in the default directory
   * for temporary files, unless `dir` is specified. Other optional options
   * include prefixing and suffixing the directory name with `prefix` and
   * `suffix` respectively.
   *
   * The full path to the newly created directory is returned.
   *
   * Multiple programs calling this function simultaneously will create different
   * directories. It is the caller's responsibility to remove the directory when
   * no longer needed.
   *
   * ```ts
   * const tempDirName0 = Deno.makeTempDirSync();  // e.g. /tmp/2894ea76
   * const tempDirName1 = Deno.makeTempDirSync({ prefix: 'my_temp' });  // e.g. /tmp/my_temp339c944d
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function makeTempDirSync(options?: MakeTempOptions): string;
  /**
   * Creates a new temporary file in the default directory for temporary
   * files, unless `dir` is specified.
   *
   * Other options include prefixing and suffixing the directory name with
   * `prefix` and `suffix` respectively.
   *
   * This call resolves to the full path to the newly created file.
   *
   * Multiple programs calling this function simultaneously will create
   * different files. It is the caller's responsibility to remove the file when
   * no longer needed.
   *
   * ```ts
   * const tmpFileName0 = await Deno.makeTempFile();  // e.g. /tmp/419e0bf2
   * const tmpFileName1 = await Deno.makeTempFile({ prefix: 'my_temp' });  // e.g. /tmp/my_temp754d3098
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function makeTempFile(options?: MakeTempOptions): Promise<string>;
  /**
   * Synchronously creates a new temporary file in the default directory for
   * temporary files, unless `dir` is specified.
   *
   * Other options include prefixing and suffixing the directory name with
   * `prefix` and `suffix` respectively.
   *
   * The full path to the newly created file is returned.
   *
   * Multiple programs calling this function simultaneously will create
   * different files. It is the caller's responsibility to remove the file when
   * no longer needed.
   *
   * ```ts
   * const tempFileName0 = Deno.makeTempFileSync(); // e.g. /tmp/419e0bf2
   * const tempFileName1 = Deno.makeTempFileSync({ prefix: 'my_temp' });  // e.g. /tmp/my_temp754d3098
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function makeTempFileSync(options?: MakeTempOptions): string;
  /**
   * Returns an object describing the memory usage of the Deno process and the
   * V8 subsystem measured in bytes.
   *
   * @category Runtime Environment
   */
  export function memoryUsage(): MemoryUsage;
  /**
   * Creates a new directory with the specified path.
   *
   * ```ts
   * await Deno.mkdir("new_dir");
   * await Deno.mkdir("nested/directories", { recursive: true });
   * await Deno.mkdir("restricted_access_dir", { mode: 0o700 });
   * ```
   *
   * Defaults to throwing error if the directory already exists.
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function mkdir(path: string | URL, options?: MkdirOptions): Promise<void>;
  /**
   * Synchronously creates a new directory with the specified path.
   *
   * ```ts
   * Deno.mkdirSync("new_dir");
   * Deno.mkdirSync("nested/directories", { recursive: true });
   * Deno.mkdirSync("restricted_access_dir", { mode: 0o700 });
   * ```
   *
   * Defaults to throwing error if the directory already exists.
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function mkdirSync(path: string | URL, options?: MkdirOptions): void;
  /**
   * Open a file and resolve to an instance of {@linkcode Deno.FsFile}. The
   * file does not need to previously exist if using the `create` or `createNew`
   * open options. It is the caller's responsibility to close the file when
   * finished with it.
   *
   * ```ts
   * const file = await Deno.open("/foo/bar.txt", { read: true, write: true });
   * // Do work with file
   * file.close();
   * ```
   *
   * Requires `allow-read` and/or `allow-write` permissions depending on
   * options.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function open(path: string | URL, options?: OpenOptions): Promise<FsFile>;
  /**
   * Synchronously open a file and return an instance of
   * {@linkcode Deno.FsFile}. The file does not need to previously exist if
   * using the `create` or `createNew` open options. It is the caller's
   * responsibility to close the file when finished with it.
   *
   * ```ts
   * const file = Deno.openSync("/foo/bar.txt", { read: true, write: true });
   * // Do work with file
   * file.close();
   * ```
   *
   * Requires `allow-read` and/or `allow-write` permissions depending on
   * options.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function openSync(path: string | URL, options?: OpenOptions): FsFile;
  /**
   * Returns the release version of the Operating System.
   *
   * ```ts
   * console.log(Deno.osRelease());
   * ```
   *
   * Requires `allow-sys` permission.
   * Under consideration to possibly move to Deno.build or Deno.versions and if
   * it should depend sys-info, which may not be desirable.
   *
   * @tags allow-sys
   * @category Runtime Environment
   */
  export function osRelease(): string;
  /**
   * Returns the Operating System uptime in number of seconds.
   *
   * ```ts
   * console.log(Deno.osUptime());
   * ```
   *
   * Requires `allow-sys` permission.
   *
   * @tags allow-sys
   * @category Runtime Environment
   */
  export function osUptime(): number;
  /**
   * Read from a resource ID (`rid`) into an array buffer (`buffer`).
   *
   * Resolves to either the number of bytes read during the operation or EOF
   * (`null`) if there was nothing more to read.
   *
   * It is possible for a read to successfully return with `0` bytes. This does
   * not indicate EOF.
   *
   * This function is one of the lowest level APIs and most users should not
   * work with this directly, but rather use
   * [`readAll()`](https://deno.land/std/streams/read_all.ts?s=readAll) from
   * [`std/streams/read_all.ts`](https://deno.land/std/streams/read_all.ts)
   * instead.
   *
   * **It is not guaranteed that the full buffer will be read in a single call.**
   *
   * ```ts
   * // if "/foo/bar.txt" contains the text "hello world":
   * const file = await Deno.open("/foo/bar.txt");
   * const buf = new Uint8Array(100);
   * const numberOfBytesRead = await Deno.read(file.rid, buf); // 11 bytes
   * const text = new TextDecoder().decode(buf);  // "hello world"
   * Deno.close(file.rid);
   * ```
   *
   * @category I/O
   */
  export function read(rid: number, buffer: Uint8Array): Promise<number | null>;
  /**
   * Reads the directory given by `path` and returns an async iterable of
   * {@linkcode Deno.DirEntry}.
   *
   * ```ts
   * for await (const dirEntry of Deno.readDir("/")) {
   *   console.log(dirEntry.name);
   * }
   * ```
   *
   * Throws error if `path` is not a directory.
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readDir(path: string | URL): AsyncIterable<DirEntry>;
  /**
   * Synchronously reads the directory given by `path` and returns an iterable
   * of `Deno.DirEntry`.
   *
   * ```ts
   * for (const dirEntry of Deno.readDirSync("/")) {
   *   console.log(dirEntry.name);
   * }
   * ```
   *
   * Throws error if `path` is not a directory.
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readDirSync(path: string | URL): Iterable<DirEntry>;
  /**
   * Reads and resolves to the entire contents of a file as an array of bytes.
   * `TextDecoder` can be used to transform the bytes to string if required.
   * Reading a directory returns an empty data array.
   *
   * ```ts
   * const decoder = new TextDecoder("utf-8");
   * const data = await Deno.readFile("hello.txt");
   * console.log(decoder.decode(data));
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readFile(path: string | URL, options?: ReadFileOptions): Promise<Uint8Array>;
  /**
   * Synchronously reads and returns the entire contents of a file as an array
   * of bytes. `TextDecoder` can be used to transform the bytes to string if
   * required. Reading a directory returns an empty data array.
   *
   * ```ts
   * const decoder = new TextDecoder("utf-8");
   * const data = Deno.readFileSync("hello.txt");
   * console.log(decoder.decode(data));
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readFileSync(path: string | URL): Uint8Array;
  /**
   * Resolves to the full path destination of the named symbolic link.
   *
   * ```ts
   * await Deno.symlink("./test.txt", "./test_link.txt");
   * const target = await Deno.readLink("./test_link.txt"); // full path of ./test.txt
   * ```
   *
   * Throws TypeError if called with a hard link.
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readLink(path: string | URL): Promise<string>;
  /**
   * Synchronously returns the full path destination of the named symbolic
   * link.
   *
   * ```ts
   * Deno.symlinkSync("./test.txt", "./test_link.txt");
   * const target = Deno.readLinkSync("./test_link.txt"); // full path of ./test.txt
   * ```
   *
   * Throws TypeError if called with a hard link.
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readLinkSync(path: string | URL): string;
  /**
   * Synchronously read from a resource ID (`rid`) into an array buffer
   * (`buffer`).
   *
   * Returns either the number of bytes read during the operation or EOF
   * (`null`) if there was nothing more to read.
   *
   * It is possible for a read to successfully return with `0` bytes. This does
   * not indicate EOF.
   *
   * This function is one of the lowest level APIs and most users should not
   * work with this directly, but rather use
   * [`readAllSync()`](https://deno.land/std/streams/read_all.ts?s=readAllSync)
   * from
   * [`std/streams/read_all.ts`](https://deno.land/std/streams/read_all.ts)
   * instead.
   *
   * **It is not guaranteed that the full buffer will be read in a single
   * call.**
   *
   * ```ts
   * // if "/foo/bar.txt" contains the text "hello world":
   * const file = Deno.openSync("/foo/bar.txt");
   * const buf = new Uint8Array(100);
   * const numberOfBytesRead = Deno.readSync(file.rid, buf); // 11 bytes
   * const text = new TextDecoder().decode(buf);  // "hello world"
   * Deno.close(file.rid);
   * ```
   *
   * @category I/O
   */
  export function readSync(rid: number, buffer: Uint8Array): number | null;
  /**
   * Asynchronously reads and returns the entire contents of a file as an UTF-8
   *  decoded string. Reading a directory throws an error.
   *
   * ```ts
   * const data = await Deno.readTextFile("hello.txt");
   * console.log(data);
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readTextFile(path: string | URL, options?: ReadFileOptions): Promise<string>;
  /**
   * Synchronously reads and returns the entire contents of a file as an UTF-8
   *  decoded string. Reading a directory throws an error.
   *
   * ```ts
   * const data = Deno.readTextFileSync("hello.txt");
   * console.log(data);
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function readTextFileSync(path: string | URL): string;
  /**
   * Resolves to the absolute normalized path, with symbolic links resolved.
   *
   * ```ts
   * // e.g. given /home/alice/file.txt and current directory /home/alice
   * await Deno.symlink("file.txt", "symlink_file.txt");
   * const realPath = await Deno.realPath("./file.txt");
   * const realSymLinkPath = await Deno.realPath("./symlink_file.txt");
   * console.log(realPath);  // outputs "/home/alice/file.txt"
   * console.log(realSymLinkPath);  // outputs "/home/alice/file.txt"
   * ```
   *
   * Requires `allow-read` permission for the target path.
   *
   * Also requires `allow-read` permission for the `CWD` if the target path is
   * relative.
   *
   * @tags allow-read
   * @category File System
   */
  export function realPath(path: string | URL): Promise<string>;
  /**
   * Synchronously returns absolute normalized path, with symbolic links
   * resolved.
   *
   * ```ts
   * // e.g. given /home/alice/file.txt and current directory /home/alice
   * Deno.symlinkSync("file.txt", "symlink_file.txt");
   * const realPath = Deno.realPathSync("./file.txt");
   * const realSymLinkPath = Deno.realPathSync("./symlink_file.txt");
   * console.log(realPath);  // outputs "/home/alice/file.txt"
   * console.log(realSymLinkPath);  // outputs "/home/alice/file.txt"
   * ```
   *
   * Requires `allow-read` permission for the target path.
   *
   * Also requires `allow-read` permission for the `CWD` if the target path is
   * relative.
   *
   * @tags allow-read
   * @category File System
   */
  export function realPathSync(path: string | URL): string;
  /**
   * Removes the named file or directory.
   *
   * ```ts
   * await Deno.remove("/path/to/empty_dir/or/file");
   * await Deno.remove("/path/to/populated_dir/or/file", { recursive: true });
   * ```
   *
   * Throws error if permission denied, path not found, or path is a non-empty
   * directory and the `recursive` option isn't set to `true`.
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function remove(path: string | URL, options?: RemoveOptions): Promise<void>;
  /**
   * Synchronously removes the named file or directory.
   *
   * ```ts
   * Deno.removeSync("/path/to/empty_dir/or/file");
   * Deno.removeSync("/path/to/populated_dir/or/file", { recursive: true });
   * ```
   *
   * Throws error if permission denied, path not found, or path is a non-empty
   * directory and the `recursive` option isn't set to `true`.
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function removeSync(path: string | URL, options?: RemoveOptions): void;
  /**
   * Renames (moves) `oldpath` to `newpath`. Paths may be files or directories.
   * If `newpath` already exists and is not a directory, `rename()` replaces it.
   * OS-specific restrictions may apply when `oldpath` and `newpath` are in
   * different directories.
   *
   * ```ts
   * await Deno.rename("old/path", "new/path");
   * ```
   *
   * On Unix-like OSes, this operation does not follow symlinks at either path.
   *
   * It varies between platforms when the operation throws errors, and if so
   * what they are. It's always an error to rename anything to a non-empty
   * directory.
   *
   * Requires `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function rename(oldpath: string | URL, newpath: string | URL): Promise<void>;
  /**
   * Synchronously renames (moves) `oldpath` to `newpath`. Paths may be files or
   * directories. If `newpath` already exists and is not a directory,
   * `renameSync()` replaces it. OS-specific restrictions may apply when
   * `oldpath` and `newpath` are in different directories.
   *
   * ```ts
   * Deno.renameSync("old/path", "new/path");
   * ```
   *
   * On Unix-like OSes, this operation does not follow symlinks at either path.
   *
   * It varies between platforms when the operation throws errors, and if so what
   * they are. It's always an error to rename anything to a non-empty directory.
   *
   * Requires `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function renameSync(oldpath: string | URL, newpath: string | URL): void;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "A" | "AAAA" | "ANAME" | "CNAME" | "NS" | "PTR", options?: ResolveDnsOptions): Promise<string[]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "CAA", options?: ResolveDnsOptions): Promise<CAARecord[]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "MX", options?: ResolveDnsOptions): Promise<MXRecord[]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "NAPTR", options?: ResolveDnsOptions): Promise<NAPTRRecord[]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "SOA", options?: ResolveDnsOptions): Promise<SOARecord[]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "SRV", options?: ResolveDnsOptions): Promise<SRVRecord[]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: "TXT", options?: ResolveDnsOptions): Promise<string[][]>;
  /**
   * Performs DNS resolution against the given query, returning resolved
   * records.
   *
   * Fails in the cases such as:
   *
   * - the query is in invalid format.
   * - the options have an invalid parameter. For example `nameServer.port` is
   *   beyond the range of 16-bit unsigned integer.
   * - the request timed out.
   *
   * ```ts
   * const a = await Deno.resolveDns("example.com", "A");
   *
   * const aaaa = await Deno.resolveDns("example.com", "AAAA", {
   *   nameServer: { ipAddr: "8.8.8.8", port: 53 },
   * });
   * ```
   *
   * Requires `allow-net` permission.
   *
   * @tags allow-net
   * @category Network
   */
  export function resolveDns(query: string, recordType: RecordType, options?: ResolveDnsOptions): Promise<
    | string[]
    | CAARecord[]
    | MXRecord[]
    | NAPTRRecord[]
    | SOARecord[]
    | SRVRecord[]
    | string[][]
    >;

  export class Process<T extends Deno.RunOptions = Deno.RunOptions> implements Deno.Process<T> {
    #private;
    get rid(): number;
    get pid(): number;
    get stdin(): T["stdin"] extends "piped" ? Deno.Writer & Deno.Closer & {
          writable: import("stream/web").WritableStream<Uint8Array>;
      } : (Deno.Writer & Deno.Closer & {
          writable: import("stream/web").WritableStream<Uint8Array>;
      }) | null;
    get stdout(): T["stdout"] extends "piped" ? Deno.Reader & Deno.Closer & {
          readable: import("stream/web").ReadableStream<Uint8Array>;
      } : (Deno.Reader & Deno.Closer & {
          readable: import("stream/web").ReadableStream<Uint8Array>;
      }) | null;
    get stderr(): T["stderr"] extends "piped" ? Deno.Reader & Deno.Closer & {
          readable: import("stream/web").ReadableStream<Uint8Array>;
      } : (Deno.Reader & Deno.Closer & {
          readable: import("stream/web").ReadableStream<Uint8Array>;
      }) | null;
    status(): Promise<Deno.ProcessStatus>;
    output(): Promise<Uint8Array>;
    stderrOutput(): Promise<Uint8Array>;
    close(): void;
    kill(signo?: string): void;
  }

  /**
   * @deprecated Use {@linkcode Deno.Command} instead.
   *
   * Spawns new subprocess. RunOptions must contain at a minimum the `opt.cmd`,
   * an array of program arguments, the first of which is the binary.
   *
   * ```ts
   * const p = Deno.run({
   *   cmd: ["curl", "https://example.com"],
   * });
   * const status = await p.status();
   * ```
   *
   * Subprocess uses same working directory as parent process unless `opt.cwd`
   * is specified.
   *
   * Environmental variables from parent process can be cleared using `opt.clearEnv`.
   * Doesn't guarantee that only `opt.env` variables are present,
   * as the OS may set environmental variables for processes.
   *
   * Environmental variables for subprocess can be specified using `opt.env`
   * mapping.
   *
   * `opt.uid` sets the child process’s user ID. This translates to a setuid call
   * in the child process. Failure in the setuid call will cause the spawn to fail.
   *
   * `opt.gid` is similar to `opt.uid`, but sets the group ID of the child process.
   * This has the same semantics as the uid field.
   *
   * By default subprocess inherits stdio of parent process. To change
   * this this, `opt.stdin`, `opt.stdout`, and `opt.stderr` can be set
   * independently to a resource ID (_rid_) of an open file, `"inherit"`,
   * `"piped"`, or `"null"`:
   *
   * - _number_: the resource ID of an open file/resource. This allows you to
   *   read or write to a file.
   * - `"inherit"`: The default if unspecified. The subprocess inherits from the
   *   parent.
   * - `"piped"`: A new pipe should be arranged to connect the parent and child
   *   sub-process.
   * - `"null"`: This stream will be ignored. This is the equivalent of attaching
   *   the stream to `/dev/null`.
   *
   * Details of the spawned process are returned as an instance of
   * {@linkcode Deno.Process}.
   *
   * Requires `allow-run` permission.
   * @tags allow-run
   * @category Sub Process
   */
  export function run<T extends RunOptions = RunOptions>(opt: T): Process<T>;
  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * Spawns new subprocess. RunOptions must contain at a minimum the `opt.cmd`,
   * an array of program arguments, the first of which is the binary.
   *
   * ```ts
   * const p = Deno.run({
   *   cmd: ["curl", "https://example.com"],
   * });
   * const status = await p.status();
   * ```
   *
   * Subprocess uses same working directory as parent process unless `opt.cwd`
   * is specified.
   *
   * Environmental variables from parent process can be cleared using `opt.clearEnv`.
   * Doesn't guarantee that only `opt.env` variables are present,
   * as the OS may set environmental variables for processes.
   *
   * Environmental variables for subprocess can be specified using `opt.env`
   * mapping.
   *
   * `opt.uid` sets the child process’s user ID. This translates to a setuid call
   * in the child process. Failure in the setuid call will cause the spawn to fail.
   *
   * `opt.gid` is similar to `opt.uid`, but sets the group ID of the child process.
   * This has the same semantics as the uid field.
   *
   * By default subprocess inherits stdio of parent process. To change
   * this this, `opt.stdin`, `opt.stdout`, and `opt.stderr` can be set
   * independently to a resource ID (_rid_) of an open file, `"inherit"`,
   * `"piped"`, or `"null"`:
   *
   * - _number_: the resource ID of an open file/resource. This allows you to
   *   read or write to a file.
   * - `"inherit"`: The default if unspecified. The subprocess inherits from the
   *   parent.
   * - `"piped"`: A new pipe should be arranged to connect the parent and child
   *   sub-process.
   * - `"null"`: This stream will be ignored. This is the equivalent of attaching
   *   the stream to `/dev/null`.
   *
   * Details of the spawned process are returned as an instance of
   * {@linkcode Deno.Process}.
   *
   * Requires `allow-run` permission.
   *
   * @tags allow-run
   * @category Sub Process
   */
  export function run<T extends UnstableRunOptions = UnstableRunOptions>(opt: T): Process<T>;
  export type UnstableRunOptions = RunOptions & {
        clearEnv?: boolean;
        gid?: number;
        uid?: number;
    };
  /**
   * Shutdown socket send operations.
   *
   * Matches behavior of POSIX shutdown(3).
   *
   * ```ts
   * const listener = Deno.listen({ port: 80 });
   * const conn = await listener.accept();
   * Deno.shutdown(conn.rid);
   * ```
   *
   * @category Network
   */
  export function shutdown(rid: number): Promise<void>;
  /**
   * Resolves to a {@linkcode Deno.FileInfo} for the specified `path`. Will
   * always follow symlinks.
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   * const fileInfo = await Deno.stat("hello.txt");
   * assert(fileInfo.isFile);
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function stat(path: string | URL): Promise<FileInfo>;
  /**
   * Synchronously returns a {@linkcode Deno.FileInfo} for the specified
   * `path`. Will always follow symlinks.
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   * const fileInfo = Deno.statSync("hello.txt");
   * assert(fileInfo.isFile);
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function statSync(path: string | URL): FileInfo;
  /**
   * Creates `newpath` as a symbolic link to `oldpath`.
   *
   * The `options.type` parameter can be set to `"file"` or `"dir"`. This
   * argument is only available on Windows and ignored on other platforms.
   *
   * ```ts
   * await Deno.symlink("old/name", "new/name");
   * ```
   *
   * Requires full `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function symlink(oldpath: string | URL, newpath: string | URL, options?: SymlinkOptions): Promise<void>;
  /**
   * Creates `newpath` as a symbolic link to `oldpath`.
   *
   * The `options.type` parameter can be set to `"file"` or `"dir"`. This
   * argument is only available on Windows and ignored on other platforms.
   *
   * ```ts
   * Deno.symlinkSync("old/name", "new/name");
   * ```
   *
   * Requires full `allow-read` and `allow-write` permissions.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function symlinkSync(oldpath: string | URL, newpath: string | URL, options?: SymlinkOptions): void;
  /**
   * Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   *
   * `fn` can be async if required.
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test({
   *   name: "example test",
   *   fn() {
   *     assertEquals("world", "world");
   *   },
   * });
   *
   * Deno.test({
   *   name: "example ignored test",
   *   ignore: Deno.build.os === "windows",
   *   fn() {
   *     // This test is ignored only on Windows machines
   *   },
   * });
   *
   * Deno.test({
   *   name: "example async test",
   *   async fn() {
   *     const decoder = new TextDecoder("utf-8");
   *     const data = await Deno.readFile("hello_world.txt");
   *     assertEquals(decoder.decode(data), "Hello world");
   *   }
   * });
   * ```
   *
   * @category Testing
   */
  export function test(t: TestDefinition): void;
  /**
   * Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   *
   * `fn` can be async if required.
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test("My test description", () => {
   *   assertEquals("hello", "hello");
   * });
   *
   * Deno.test("My async test description", async () => {
   *   const decoder = new TextDecoder("utf-8");
   *   const data = await Deno.readFile("hello_world.txt");
   *   assertEquals(decoder.decode(data), "Hello world");
   * });
   * ```
   *
   * @category Testing
   */
  export function test(name: string, fn: (t: TestContext) => void | Promise<void>): void;
  /**
   * Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   *
   * `fn` can be async if required. Declared function must have a name.
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test(function myTestName() {
   *   assertEquals("hello", "hello");
   * });
   *
   * Deno.test(async function myOtherTestName() {
   *   const decoder = new TextDecoder("utf-8");
   *   const data = await Deno.readFile("hello_world.txt");
   *   assertEquals(decoder.decode(data), "Hello world");
   * });
   * ```
   *
   * @category Testing
   */
  export function test(fn: (t: TestContext) => void | Promise<void>): void;
  /**
   * Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   *
   * `fn` can be async if required.
   *
   * ```ts
   * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test("My test description", { permissions: { read: true } }, (): void => {
   *   assertEquals("hello", "hello");
   * });
   *
   * Deno.test("My async test description", { permissions: { read: false } }, async (): Promise<void> => {
   *   const decoder = new TextDecoder("utf-8");
   *   const data = await Deno.readFile("hello_world.txt");
   *   assertEquals(decoder.decode(data), "Hello world");
   * });
   * ```
   *
   * @category Testing
   */
  export function test(name: string, options: Omit<TestDefinition, "fn" | "name">, fn: (t: TestContext) => void | Promise<void>): void;
  /**
   * Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   *
   * `fn` can be async if required.
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test(
   *   {
   *     name: "My test description",
   *     permissions: { read: true },
   *   },
   *   () => {
   *     assertEquals("hello", "hello");
   *   },
   * );
   *
   * Deno.test(
   *   {
   *     name: "My async test description",
   *     permissions: { read: false },
   *   },
   *   async () => {
   *     const decoder = new TextDecoder("utf-8");
   *     const data = await Deno.readFile("hello_world.txt");
   *     assertEquals(decoder.decode(data), "Hello world");
   *   },
   * );
   * ```
   *
   * @category Testing
   */
  export function test(options: Omit<TestDefinition, "fn">, fn: (t: TestContext) => void | Promise<void>): void;
  /**
   * Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   *
   * `fn` can be async if required. Declared function must have a name.
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test(
   *   { permissions: { read: true } },
   *   function myTestName() {
   *     assertEquals("hello", "hello");
   *   },
   * );
   *
   * Deno.test(
   *   { permissions: { read: false } },
   *   async function myOtherTestName() {
   *     const decoder = new TextDecoder("utf-8");
   *     const data = await Deno.readFile("hello_world.txt");
   *     assertEquals(decoder.decode(data), "Hello world");
   *   },
   * );
   * ```
   *
   * @category Testing
   */
  export function test(options: Omit<TestDefinition, "fn" | "name">, fn: (t: TestContext) => void | Promise<void>): void;
  /**
   * Truncates (or extends) the specified file, to reach the specified `len`.
   * If `len` is not specified then the entire file contents are truncated.
   *
   * ### Truncate the entire file
   * ```ts
   * await Deno.truncate("my_file.txt");
   * ```
   *
   * ### Truncate part of the file
   *
   * ```ts
   * const file = await Deno.makeTempFile();
   * await Deno.writeFile(file, new TextEncoder().encode("Hello World"));
   * await Deno.truncate(file, 7);
   * const data = await Deno.readFile(file);
   * console.log(new TextDecoder().decode(data));  // "Hello W"
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function truncate(name: string, len?: number): Promise<void>;
  /**
   * Synchronously truncates (or extends) the specified file, to reach the
   * specified `len`. If `len` is not specified then the entire file contents
   * are truncated.
   *
   * ### Truncate the entire file
   *
   * ```ts
   * Deno.truncateSync("my_file.txt");
   * ```
   *
   * ### Truncate part of the file
   *
   * ```ts
   * const file = Deno.makeTempFileSync();
   * Deno.writeFileSync(file, new TextEncoder().encode("Hello World"));
   * Deno.truncateSync(file, 7);
   * const data = Deno.readFileSync(file);
   * console.log(new TextDecoder().decode(data));
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function truncateSync(name: string, len?: number): void;
  /**
   * Returns the user id of the process on POSIX platforms. Returns null on Windows.
   *
   * ```ts
   * console.log(Deno.uid());
   * ```
   *
   * Requires `allow-sys` permission.
   *
   * @tags allow-sys
   * @category Runtime Environment
   */
  export function uid(): number | null;
  /**
   * Watch for file system events against one or more `paths`, which can be
   * files or directories. These paths must exist already. One user action (e.g.
   * `touch test.file`) can generate multiple file system events. Likewise,
   * one user action can result in multiple file paths in one event (e.g. `mv
   * old_name.txt new_name.txt`).
   *
   * The recursive option is `true` by default and, for directories, will watch
   * the specified directory and all sub directories.
   *
   * Note that the exact ordering of the events can vary between operating
   * systems.
   *
   * ```ts
   * const watcher = Deno.watchFs("/");
   * for await (const event of watcher) {
   *    console.log(">>>> event", event);
   *    // { kind: "create", paths: [ "/foo.txt" ] }
   * }
   * ```
   *
   * Call `watcher.close()` to stop watching.
   *
   * ```ts
   * const watcher = Deno.watchFs("/");
   *
   * setTimeout(() => {
   *   watcher.close();
   * }, 5000);
   *
   * for await (const event of watcher) {
   *    console.log(">>>> event", event);
   * }
   * ```
   *
   * Requires `allow-read` permission.
   *
   * @tags allow-read
   * @category File System
   */
  export function watchFs(paths: string | string[], options?: { recursive: boolean }): FsWatcher;
  /**
   * Write to the resource ID (`rid`) the contents of the array buffer (`data`).
   *
   * Resolves to the number of bytes written. This function is one of the lowest
   * level APIs and most users should not work with this directly, but rather use
   * [`writeAll()`](https://deno.land/std/streams/write_all.ts?s=writeAll) from
   * [`std/streams/write_all.ts`](https://deno.land/std/streams/write_all.ts)
   * instead.
   *
   * **It is not guaranteed that the full buffer will be written in a single
   * call.**
   *
   * ```ts
   * const encoder = new TextEncoder();
   * const data = encoder.encode("Hello world");
   * const file = await Deno.open("/foo/bar.txt", { write: true });
   * const bytesWritten = await Deno.write(file.rid, data); // 11
   * Deno.close(file.rid);
   * ```
   *
   * @category I/O
   */
  export function write(rid: number, data: Uint8Array): Promise<number>;
  /**
   * Write `data` to the given `path`, by default creating a new file if
   * needed, else overwriting.
   *
   * ```ts
   * const encoder = new TextEncoder();
   * const data = encoder.encode("Hello world\n");
   * await Deno.writeFile("hello1.txt", data);  // overwrite "hello1.txt" or create it
   * await Deno.writeFile("hello2.txt", data, { create: false });  // only works if "hello2.txt" exists
   * await Deno.writeFile("hello3.txt", data, { mode: 0o777 });  // set permissions on new file
   * await Deno.writeFile("hello4.txt", data, { append: true });  // add data to the end of the file
   * ```
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is
   * `false`.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function writeFile(path: string | URL, data: Uint8Array | ReadableStream<Uint8Array>, options?: WriteFileOptions): Promise<void>;
  /**
   * Synchronously write `data` to the given `path`, by default creating a new
   * file if needed, else overwriting.
   *
   * ```ts
   * const encoder = new TextEncoder();
   * const data = encoder.encode("Hello world\n");
   * Deno.writeFileSync("hello1.txt", data);  // overwrite "hello1.txt" or create it
   * Deno.writeFileSync("hello2.txt", data, { create: false });  // only works if "hello2.txt" exists
   * Deno.writeFileSync("hello3.txt", data, { mode: 0o777 });  // set permissions on new file
   * Deno.writeFileSync("hello4.txt", data, { append: true });  // add data to the end of the file
   * ```
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is
   * `false`.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function writeFileSync(path: string | URL, data: Uint8Array, options?: WriteFileOptions): void;
  /**
   * Synchronously write to the resource ID (`rid`) the contents of the array
   * buffer (`data`).
   *
   * Returns the number of bytes written. This function is one of the lowest
   * level APIs and most users should not work with this directly, but rather
   * use
   * [`writeAllSync()`](https://deno.land/std/streams/write_all.ts?s=writeAllSync)
   * from
   * [`std/streams/write_all.ts`](https://deno.land/std/streams/write_all.ts)
   * instead.
   *
   * **It is not guaranteed that the full buffer will be written in a single
   * call.**
   *
   * ```ts
   * const encoder = new TextEncoder();
   * const data = encoder.encode("Hello world");
   * const file = Deno.openSync("/foo/bar.txt", { write: true });
   * const bytesWritten = Deno.writeSync(file.rid, data); // 11
   * Deno.close(file.rid);
   * ```
   *
   * @category I/O
   */
  export function writeSync(rid: number, data: Uint8Array): number;
  /**
   * Write string `data` to the given `path`, by default creating a new file if
   * needed, else overwriting.
   *
   * ```ts
   * await Deno.writeTextFile("hello1.txt", "Hello world\n");  // overwrite "hello1.txt" or create it
   * ```
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is
   * `false`.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function writeTextFile(path: string | URL, data: string | ReadableStream<string>, options?: WriteFileOptions): Promise<void>;
  /**
   * Synchronously write string `data` to the given `path`, by default creating
   * a new file if needed, else overwriting.
   *
   * ```ts
   * Deno.writeTextFileSync("hello1.txt", "Hello world\n");  // overwrite "hello1.txt" or create it
   * ```
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is
   * `false`.
   *
   * @tags allow-read, allow-write
   * @category File System
   */
  export function writeTextFileSync(path: string | URL, data: string, options?: WriteFileOptions): void;
  /**
   * Returns the script arguments to the program.
   *
   * Give the following command line invocation of Deno:
   *
   * ```sh
   * deno run --allow-read https://deno.land/std/examples/cat.ts /etc/passwd
   * ```
   *
   * Then `Deno.args` will contain:
   *
   * ```ts
   * [ "/etc/passwd" ]
   * ```
   *
   * If you are looking for a structured way to parse arguments, there is the
   * [`std/flags`](https://deno.land/std/flags) module as part of the Deno
   * standard library.
   *
   * @category Runtime Environment
   */
  export const args: string[];
  /** @category Network */
  export type Addr = NetAddr | UnixAddr;

  /**
   * An abstract interface which when implemented provides an interface to close
   * files/resources that were previously opened.
   *
   * @category I/O
   */
  export interface Closer {
    /** Closes the resource, "freeing" the backing file/resource. */
    close(): void;
  }

  /** @category Network */
  export interface Conn extends Reader, Writer, Closer {
    /** The local address of the connection. */
    readonly localAddr: Addr;
    /** The remote address of the connection. */
    readonly remoteAddr: Addr;
    /** The resource ID of the connection. */
    readonly rid: number;
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<Uint8Array>;
    /**
     * Shuts down (`shutdown(2)`) the write side of the connection. Most
     * callers should just use `close()`.
     */
    closeWrite(): Promise<void>;
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * Make the connection block the event loop from finishing.
     *
     * Note: the connection blocks the event loop from finishing by default.
     * This method is only meaningful after `.unref()` is called.
     */
    ref(): void;
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * Make the connection not block the event loop from finishing.
     */
    unref(): void;
  }

  /** @category Network */
  export interface ConnectOptions {
    /** The port to connect to. */
    port: number;
    /**
     * A literal IP address or host name that can be resolved to an IP address.
     * If not specified,
     *
     * @default {"127.0.0.1"}
     */
    hostname?: string;
    transport?: "tcp";
  }

  /** @category Network */
  export interface ConnectTlsOptions {
    /** The port to connect to. */
    port: number;
    /**
     * A literal IP address or host name that can be resolved to an IP address.
     *
     * @default {"127.0.0.1"}
     */
    hostname?: string;
    /**
     * Server certificate file.
     *
     * @deprecated This option is deprecated and will be removed in a future
     * release.
     */
    certFile?: string;
    /**
     * A list of root certificates that will be used in addition to the
     * default root certificates to verify the peer's certificate.
     *
     * Must be in PEM format.
     */
    caCerts?: string[];
  }

  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * @category Network
   */
  export interface ConnectTlsOptions {
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * PEM formatted client certificate chain.
     */
    certChain?: string;
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * PEM formatted (RSA or PKCS8) private key of client certificate.
     */
    privateKey?: string;
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * Application-Layer Protocol Negotiation (ALPN) protocols supported by
     * the client. If not specified, no ALPN extension will be included in the
     * TLS handshake.
     */
    alpnProtocols?: string[];
  }

  /**
   * Information about a directory entry returned from {@linkcode Deno.readDir}
   * and {@linkcode Deno.readDirSync}.
   *
   * @category File System
   */
  export interface DirEntry {
    /**
     * The file name of the entry. It is just the entity name and does not
     * include the full path.
     */
    name: string;
    /**
     * True if this is info for a regular file. Mutually exclusive to
     * `DirEntry.isDirectory` and `DirEntry.isSymlink`.
     */
    isFile: boolean;
    /**
     * True if this is info for a regular directory. Mutually exclusive to
     * `DirEntry.isFile` and `DirEntry.isSymlink`.
     */
    isDirectory: boolean;
    /**
     * True if this is info for a symlink. Mutually exclusive to
     * `DirEntry.isFile` and `DirEntry.isDirectory`.
     */
    isSymlink: boolean;
  }

  /**
   * The permission descriptor for the `allow-env` permissions, which controls
   * access to being able to read and write to the process environment variables
   * as well as access other information about the environment. The option
   * `variable` allows scoping the permission to a specific environment
   * variable.
   *
   * @category Permissions
   */
  export interface EnvPermissionDescriptor {
    name: "env";
    /** Optional environment variable name (e.g. `PATH`). */
    variable?: string;
  }

  /**
   * The permission descriptor for the `allow-ffi` permissions, which controls
   * access to loading _foreign_ code and interfacing with it via the
   * [Foreign Function Interface API](https://deno.land/manual/runtime/ffi_api)
   * available in Deno.  The option `path` allows scoping the permission to a
   * specific path on the host.
   *
   * @category Permissions
   */
  export interface FfiPermissionDescriptor {
    name: "ffi";
    /** Optional path on the local host to scope the permission to. */
    path?: string | URL;
  }

  /**
   * The permission descriptor for the `allow-sys` permissions, which controls
   * access to sensitive host system information, which malicious code might
   * attempt to exploit. The option `kind` allows scoping the permission to a
   * specific piece of information.
   *
   * @category Permissions
   */
  export interface SysPermissionDescriptor {
    name: "sys";
    /** The specific information to scope the permission to. */
    kind?: | "loadavg"
      | "hostname"
      | "systemMemoryInfo"
      | "networkInterfaces"
      | "osRelease"
      | "osUptime"
      | "uid"
      | "gid";
  }

  /**
   * An interface containing methods to interact with the process environment
   * variables.
   *
   * @tags allow-env
   * @category Runtime Environment
   */
  export interface Env {
    /**
     * Retrieve the value of an environment variable.
     *
     * Returns `undefined` if the supplied environment variable is not defined.
     *
     * ```ts
     * console.log(Deno.env.get("HOME"));  // e.g. outputs "/home/alice"
     * console.log(Deno.env.get("MADE_UP_VAR"));  // outputs "undefined"
     * ```
     *
     * Requires `allow-env` permission.
     *
     * @tags allow-env
     */
    get(key: string): string | undefined;
    /**
     * Set the value of an environment variable.
     *
     * ```ts
     * Deno.env.set("SOME_VAR", "Value");
     * Deno.env.get("SOME_VAR");  // outputs "Value"
     * ```
     *
     * Requires `allow-env` permission.
     *
     * @tags allow-env
     */
    set(key: string, value: string): void;
    /**
     * Delete the value of an environment variable.
     *
     * ```ts
     * Deno.env.set("SOME_VAR", "Value");
     * Deno.env.delete("SOME_VAR");  // outputs "undefined"
     * ```
     *
     * Requires `allow-env` permission.
     *
     * @tags allow-env
     */
    delete(key: string): void;
    /**
     * Check whether an environment variable is present or not.
     *
     * ```ts
     * Deno.env.set("SOME_VAR", "Value");
     * Deno.env.has("SOME_VAR");  // outputs true
     * ```
     *
     * Requires `allow-env` permission.
     *
     * @tags allow-env
     */
    has(key: string): boolean;
    /**
     * Returns a snapshot of the environment variables at invocation as a
     * simple object of keys and values.
     *
     * ```ts
     * Deno.env.set("TEST_VAR", "A");
     * const myEnv = Deno.env.toObject();
     * console.log(myEnv.SHELL);
     * Deno.env.set("TEST_VAR", "B");
     * console.log(myEnv.TEST_VAR);  // outputs "A"
     * ```
     *
     * Requires `allow-env` permission.
     *
     * @tags allow-env
     */
    toObject(): { [index: string]: string };
  }

  /**
   * Provides information about a file and is returned by
   * {@linkcode Deno.stat}, {@linkcode Deno.lstat}, {@linkcode Deno.statSync},
   * and {@linkcode Deno.lstatSync} or from calling `stat()` and `statSync()`
   * on an {@linkcode Deno.FsFile} instance.
   *
   * @category File System
   */
  export interface FileInfo {
    /**
     * True if this is info for a regular file. Mutually exclusive to
     * `FileInfo.isDirectory` and `FileInfo.isSymlink`.
     */
    isFile: boolean;
    /**
     * True if this is info for a regular directory. Mutually exclusive to
     * `FileInfo.isFile` and `FileInfo.isSymlink`.
     */
    isDirectory: boolean;
    /**
     * True if this is info for a symlink. Mutually exclusive to
     * `FileInfo.isFile` and `FileInfo.isDirectory`.
     */
    isSymlink: boolean;
    /** The size of the file, in bytes. */
    size: number;
    /**
     * The last modification time of the file. This corresponds to the `mtime`
     * field from `stat` on Linux/Mac OS and `ftLastWriteTime` on Windows. This
     * may not be available on all platforms.
     */
    mtime: Date | null;
    /**
     * The last access time of the file. This corresponds to the `atime`
     * field from `stat` on Unix and `ftLastAccessTime` on Windows. This may not
     * be available on all platforms.
     */
    atime: Date | null;
    /**
     * The creation time of the file. This corresponds to the `birthtime`
     * field from `stat` on Mac/BSD and `ftCreationTime` on Windows. This may
     * not be available on all platforms.
     */
    birthtime: Date | null;
    /** ID of the device containing the file. */
    dev: number;
    /**
     * Inode number.
     *
     * _Linux/Mac OS only._
     */
    ino: number | null;
    /**
     * *UNSTABLE**: Match behavior with Go on Windows for `mode`.
     *
     * The underlying raw `st_mode` bits that contain the standard Unix
     * permissions for this file/directory.
     */
    mode: number | null;
    /**
     * Number of hard links pointing to this file.
     *
     * _Linux/Mac OS only._
     */
    nlink: number | null;
    /**
     * User ID of the owner of this file.
     *
     * _Linux/Mac OS only._
     */
    uid: number | null;
    /**
     * Group ID of the owner of this file.
     *
     * _Linux/Mac OS only._
     */
    gid: number | null;
    /**
     * Device ID of this file.
     *
     * _Linux/Mac OS only._
     */
    rdev: number | null;
    /**
     * Blocksize for filesystem I/O.
     *
     * _Linux/Mac OS only._
     */
    blksize: number | null;
    /**
     * Number of blocks allocated to the file, in 512-byte units.
     *
     * _Linux/Mac OS only._
     */
    blocks: number | null;
  }

  /**
   * Represents a unique file system event yielded by a
   * {@linkcode Deno.FsWatcher}.
   *
   * @category File System
   */
  export interface FsEvent {
    /** The kind/type of the file system event. */
    kind: "any" | "access" | "create" | "modify" | "remove" | "other";
    /** An array of paths that are associated with the file system event. */
    paths: string[];
    /** Any additional flags associated with the event. */
    flag?: FsEventFlag;
  }

  /**
   * Additional information for FsEvent objects with the "other" kind.
   *
   * - `"rescan"`: rescan notices indicate either a lapse in the events or a
   *    change in the filesystem such that events received so far can no longer
   *    be relied on to represent the state of the filesystem now. An
   *    application that simply reacts to file changes may not care about this.
   *    An application that keeps an in-memory representation of the filesystem
   *    will need to care, and will need to refresh that representation directly
   *    from the filesystem.
   *
   * @category File System
   */
  export type FsEventFlag = "rescan";

  /**
   * Returned by {@linkcode Deno.watchFs}. It is an async iterator yielding up
   * system events. To stop watching the file system by calling `.close()`
   * method.
   *
   * @category File System
   */
  export interface FsWatcher extends AsyncIterable<FsEvent> {
    /** The resource id. */
    readonly rid: number;
    /** Stops watching the file system and closes the watcher resource. */
    close(): void;
    /**
     * Stops watching the file system and closes the watcher resource.
     *
     * @deprecated Will be removed in the future.
     */
    return?(value?: any): Promise<IteratorResult<FsEvent>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<FsEvent>;
  }

  /**
   * The permission descriptor for the `allow-hrtime` permission, which
   * controls if the runtime code has access to high resolution time. High
   * resolution time is consider sensitive information, because it can be used
   * by malicious code to gain information about the host that it might
   * otherwise have access to.
   *
   * @category Permissions
   */
  export interface HrtimePermissionDescriptor {
    name: "hrtime";
  }

  /**
   * Option which can be specified when performing {@linkcode Deno.inspect}.
   *
   * @category Console and Debugging
   */
  export interface InspectOptions {
    /**
     * Stylize output with ANSI colors.
     *
     * @default {false}
     */
    colors?: boolean;
    /**
     * Try to fit more than one entry of a collection on the same line.
     *
     * @default {true}
     */
    compact?: boolean;
    /**
     * Traversal depth for nested objects.
     *
     * @default {4}
     */
    depth?: number;
    /**
     * The maximum number of iterable entries to print.
     *
     * @default {100}
     */
    iterableLimit?: number;
    /**
     * Show a Proxy's target and handler.
     *
     * @default {false}
     */
    showProxy?: boolean;
    /**
     * Sort Object, Set and Map entries by key.
     *
     * @default {false}
     */
    sorted?: boolean;
    /**
     * Add a trailing comma for multiline collections.
     *
     * @default {false}
     */
    trailingComma?: boolean;
    /**
     * Evaluate the result of calling getters.
     *
     * @default {false}
     */
    getters?: boolean;
    /**
     * Show an object's non-enumerable properties.
     *
     * @default {false}
     */
    showHidden?: boolean;
    /**
     * The maximum length of a string before it is truncated with an
     * ellipsis.
     */
    strAbbreviateSize?: number;
  }

  /**
   * A generic network listener for stream-oriented protocols.
   *
   * @category Network
   */
  export interface Listener extends AsyncIterable<Conn> {
    /** Return the address of the `Listener`. */
    readonly addr: Addr;
    /** Return the rid of the `Listener`. */
    readonly rid: number;
    /** Waits for and resolves to the next connection to the `Listener`. */
    accept(): Promise<Conn>;
    /**
     * Close closes the listener. Any pending accept promises will be rejected
     * with errors.
     */
    close(): void;
    [Symbol.asyncIterator](): AsyncIterableIterator<Conn>;
    /**
     * Make the listener block the event loop from finishing.
     *
     * Note: the listener blocks the event loop from finishing by default.
     * This method is only meaningful after `.unref()` is called.
     */
    ref(): void;
    /** Make the listener not block the event loop from finishing. */
    unref(): void;
  }

  /** @category Network */
  export interface ListenOptions {
    /** The port to listen on. */
    port: number;
    /**
     * A literal IP address or host name that can be resolved to an IP address.
     *
     * __Note about `0.0.0.0`__ While listening `0.0.0.0` works on all platforms,
     * the browsers on Windows don't work with the address `0.0.0.0`.
     * You should show the message like `server running on localhost:8080` instead of
     * `server running on 0.0.0.0:8080` if your program supports Windows.
     *
     * @default {"0.0.0.0"}
     */
    hostname?: string;
  }

  /** @category Network */
  export interface ListenTlsOptions extends TcpListenOptions {
    /** Server private key in PEM format */
    key?: string;
    /** Cert chain in PEM format */
    cert?: string;
    /**
     * Path to a file containing a PEM formatted CA certificate. Requires
     * `--allow-read`.
     *
     * @tags allow-read
     * @deprecated This option is deprecated and will be removed in Deno 2.0.
     */
    certFile?: string;
    /**
     * Server private key file. Requires `--allow-read`.
     *
     * @tags allow-read
     * @deprecated This option is deprecated and will be removed in Deno 2.0.
     */
    keyFile?: string;
    transport?: "tcp";
  }

  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * @category Network
   */
  export interface ListenTlsOptions {
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * Application-Layer Protocol Negotiation (ALPN) protocols to announce to
     * the client. If not specified, no ALPN extension will be included in the
     * TLS handshake.
     */
    alpnProtocols?: string[];
  }

  /**
   * Options which can be set when using {@linkcode Deno.makeTempDir},
   * {@linkcode Deno.makeTempDirSync}, {@linkcode Deno.makeTempFile}, and
   * {@linkcode Deno.makeTempFileSync}.
   *
   * @category File System
   */
  export interface MakeTempOptions {
    /**
     * Directory where the temporary directory should be created (defaults to
     * the env variable `TMPDIR`, or the system's default, usually `/tmp`).
     *
     * Note that if the passed `dir` is relative, the path returned by
     * `makeTempFile()` and `makeTempDir()` will also be relative. Be mindful of
     * this when changing working directory.
     */
    dir?: string;
    /**
     * String that should precede the random portion of the temporary
     * directory's name.
     */
    prefix?: string;
    /**
     * String that should follow the random portion of the temporary
     * directory's name.
     */
    suffix?: string;
  }

  /** @category Runtime Environment */
  export interface MemoryUsage {
    /**
     * The number of bytes of the current Deno's process resident set size,
     * which is the amount of memory occupied in main memory (RAM).
     */
    rss: number;
    /** The total size of the heap for V8, in bytes. */
    heapTotal: number;
    /** The amount of the heap used for V8, in bytes. */
    heapUsed: number;
    /**
     * Memory, in bytes, associated with JavaScript objects outside of the
     * JavaScript isolate.
     */
    external: number;
  }

  /** @category Observability */
  export interface Metrics extends OpMetrics {
    ops: Record<string, OpMetrics>;
  }

  /**
   * Options which can be set when using {@linkcode Deno.mkdir} and
   * {@linkcode Deno.mkdirSync}.
   *
   * @category File System
   */
  export interface MkdirOptions {
    /**
     * If set to `true`, means that any intermediate directories will also be
     * created (as with the shell command `mkdir -p`).
     *
     * Intermediate directories are created with the same permissions.
     *
     * When recursive is set to `true`, succeeds silently (without changing any
     * permissions) if a directory already exists at the path, or if the path
     * is a symlink to an existing directory.
     *
     * @default {false}
     */
    recursive?: boolean;
    /**
     * Permissions to use when creating the directory (defaults to `0o777`,
     * before the process's umask).
     *
     * Ignored on Windows.
     */
    mode?: number;
  }

  /** @category Network */
  export interface NetAddr {
    transport: "tcp" | "udp";
    hostname: string;
    port: number;
  }

  /**
   * The permission descriptor for the `allow-net` permissions, which controls
   * access to opening network ports and connecting to remote hosts via the
   * network. The option `host` allows scoping the permission for outbound
   * connection to a specific host and port.
   *
   * @category Permissions
   */
  export interface NetPermissionDescriptor {
    name: "net";
    /**
     * Optional host string of the form `"<hostname>[:<port>]"`. Examples:
     *
     *      "github.com"
     *      "deno.land:8080"
     */
    host?: string;
  }

  /**
   * Options which can be set when doing {@linkcode Deno.open} and
   * {@linkcode Deno.openSync}.
   *
   * @category File System
   */
  export interface OpenOptions {
    /**
     * Sets the option for read access. This option, when `true`, means that
     * the file should be read-able if opened.
     *
     * @default {true}
     */
    read?: boolean;
    /**
     * Sets the option for write access. This option, when `true`, means that
     * the file should be write-able if opened. If the file already exists,
     * any write calls on it will overwrite its contents, by default without
     * truncating it.
     *
     * @default {false}
     */
    write?: boolean;
    /**
     * Sets the option for the append mode. This option, when `true`, means
     * that writes will append to a file instead of overwriting previous
     * contents.
     *
     * Note that setting `{ write: true, append: true }` has the same effect as
     * setting only `{ append: true }`.
     *
     * @default {false}
     */
    append?: boolean;
    /**
     * Sets the option for truncating a previous file. If a file is
     * successfully opened with this option set it will truncate the file to `0`
     * size if it already exists. The file must be opened with write access
     * for truncate to work.
     *
     * @default {false}
     */
    truncate?: boolean;
    /**
     * Sets the option to allow creating a new file, if one doesn't already
     * exist at the specified path. Requires write or append access to be
     * used.
     *
     * @default {false}
     */
    create?: boolean;
    /**
     * If set to `true`, no file, directory, or symlink is allowed to exist at
     * the target location. Requires write or append access to be used. When
     * createNew is set to `true`, create and truncate are ignored.
     *
     * @default {false}
     */
    createNew?: boolean;
    /**
     * Permissions to use if creating the file (defaults to `0o666`, before
     * the process's umask).
     *
     * Ignored on Windows.
     */
    mode?: number;
  }

  /** @category Observability */
  export interface OpMetrics {
    opsDispatched: number;
    opsDispatchedSync: number;
    opsDispatchedAsync: number;
    opsDispatchedAsyncUnref: number;
    opsCompleted: number;
    opsCompletedSync: number;
    opsCompletedAsync: number;
    opsCompletedAsyncUnref: number;
    bytesSentControl: number;
    bytesSentData: number;
    bytesReceived: number;
  }

  /**
   * Permission descriptors which define a permission and can be queried,
   * requested, or revoked.
   *
   * View the specifics of the individual descriptors for more information about
   * each permission kind.
   *
   * @category Permissions
   */
  export type PermissionDescriptor = | RunPermissionDescriptor
        | ReadPermissionDescriptor
        | WritePermissionDescriptor
        | NetPermissionDescriptor
        | EnvPermissionDescriptor
        | SysPermissionDescriptor
        | FfiPermissionDescriptor
        | HrtimePermissionDescriptor;
  /**
   * The name of a privileged feature which needs permission.
   *
   * @category Permissions
   */
  export type PermissionName = | "run"
        | "read"
        | "write"
        | "net"
        | "env"
        | "sys"
        | "ffi"
        | "hrtime";
  /**
   * Options which define the permissions within a test or worker context.
   *
   * `"inherit"` ensures that all permissions of the parent process will be
   * applied to the test context. `"none"` ensures the test context has no
   * permissions. A `PermissionOptionsObject` provides a more specific
   * set of permissions to the test context.
   *
   * @category Permissions
   */
  export type PermissionOptions = | "inherit"
        | "none"
        | PermissionOptionsObject;

  /**
   * A set of options which can define the permissions within a test or worker
   * context at a highly specific level.
   *
   * @category Permissions
   */
  export interface PermissionOptionsObject {
    /**
     * Specifies if the `env` permission should be requested or revoked.
     * If set to `"inherit"`, the current `env` permission will be inherited.
     * If set to `true`, the global `env` permission will be requested.
     * If set to `false`, the global `env` permission will be revoked.
     *
     * @default {false}
     */
    env?: "inherit" | boolean | string[];
    /**
     * Specifies if the `sys` permission should be requested or revoked.
     * If set to `"inherit"`, the current `sys` permission will be inherited.
     * If set to `true`, the global `sys` permission will be requested.
     * If set to `false`, the global `sys` permission will be revoked.
     *
     * @default {false}
     */
    sys?: "inherit" | boolean | string[];
    /**
     * Specifies if the `hrtime` permission should be requested or revoked.
     * If set to `"inherit"`, the current `hrtime` permission will be inherited.
     * If set to `true`, the global `hrtime` permission will be requested.
     * If set to `false`, the global `hrtime` permission will be revoked.
     *
     * @default {false}
     */
    hrtime?: "inherit" | boolean;
    /**
     * Specifies if the `net` permission should be requested or revoked.
     * if set to `"inherit"`, the current `net` permission will be inherited.
     * if set to `true`, the global `net` permission will be requested.
     * if set to `false`, the global `net` permission will be revoked.
     * if set to `string[]`, the `net` permission will be requested with the
     * specified host strings with the format `"<host>[:<port>]`.
     *
     * @default {false}
     *
     * Examples:
     *
     * ```ts
     * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
     *
     * Deno.test({
     *   name: "inherit",
     *   permissions: {
     *     net: "inherit",
     *   },
     *   async fn() {
     *     const status = await Deno.permissions.query({ name: "net" })
     *     assertEquals(status.state, "granted");
     *   },
     * });
     * ```
     *
     * ```ts
     * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
     *
     * Deno.test({
     *   name: "true",
     *   permissions: {
     *     net: true,
     *   },
     *   async fn() {
     *     const status = await Deno.permissions.query({ name: "net" });
     *     assertEquals(status.state, "granted");
     *   },
     * });
     * ```
     *
     * ```ts
     * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
     *
     * Deno.test({
     *   name: "false",
     *   permissions: {
     *     net: false,
     *   },
     *   async fn() {
     *     const status = await Deno.permissions.query({ name: "net" });
     *     assertEquals(status.state, "denied");
     *   },
     * });
     * ```
     *
     * ```ts
     * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
     *
     * Deno.test({
     *   name: "localhost:8080",
     *   permissions: {
     *     net: ["localhost:8080"],
     *   },
     *   async fn() {
     *     const status = await Deno.permissions.query({ name: "net", host: "localhost:8080" });
     *     assertEquals(status.state, "granted");
     *   },
     * });
     * ```
     */
    net?: "inherit" | boolean | string[];
    /**
     * Specifies if the `ffi` permission should be requested or revoked.
     * If set to `"inherit"`, the current `ffi` permission will be inherited.
     * If set to `true`, the global `ffi` permission will be requested.
     * If set to `false`, the global `ffi` permission will be revoked.
     *
     * @default {false}
     */
    ffi?: "inherit" | boolean | Array<string | URL>;
    /**
     * Specifies if the `read` permission should be requested or revoked.
     * If set to `"inherit"`, the current `read` permission will be inherited.
     * If set to `true`, the global `read` permission will be requested.
     * If set to `false`, the global `read` permission will be revoked.
     * If set to `Array<string | URL>`, the `read` permission will be requested with the
     * specified file paths.
     *
     * @default {false}
     */
    read?: "inherit" | boolean | Array<string | URL>;
    /**
     * Specifies if the `run` permission should be requested or revoked.
     * If set to `"inherit"`, the current `run` permission will be inherited.
     * If set to `true`, the global `run` permission will be requested.
     * If set to `false`, the global `run` permission will be revoked.
     *
     * @default {false}
     */
    run?: "inherit" | boolean | Array<string | URL>;
    /**
     * Specifies if the `write` permission should be requested or revoked.
     * If set to `"inherit"`, the current `write` permission will be inherited.
     * If set to `true`, the global `write` permission will be requested.
     * If set to `false`, the global `write` permission will be revoked.
     * If set to `Array<string | URL>`, the `write` permission will be requested with the
     * specified file paths.
     *
     * @default {false}
     */
    write?: "inherit" | boolean | Array<string | URL>;
  }

  /**
   * The current status of the permission:
   *
   * - `"granted"` - the permission has been granted.
   * - `"denied"` - the permission has been explicitly denied.
   * - `"prompt"` - the permission has not explicitly granted nor denied.
   *
   * @category Permissions
   */
  export type PermissionState = "granted" | "denied" | "prompt";

  /**
   * The interface which defines what event types are supported by
   * {@linkcode PermissionStatus} instances.
   *
   * @category Permissions
   */
  export interface PermissionStatusEventMap {
    "change": Event;
  }

  /**
   * @deprecated Use {@linkcode Deno.Command} instead.
   *
   * The status resolved from the `.status()` method of a
   * {@linkcode Deno.Process} instance.
   *
   * If `success` is `true`, then `code` will be `0`, but if `success` is
   * `false`, the sub-process exit code will be set in `code`.
   * @category Sub Process
   */
  export type ProcessStatus = | {
          success: true;
          code: 0;
          signal?: undefined;
        }
        | {
          success: false;
          code: number;
          signal?: number;
        };

  /**
   * An abstract interface which when implemented provides an interface to read
   * bytes into an array buffer asynchronously.
   *
   * @category I/O
   */
  export interface Reader {
    /**
     * Reads up to `p.byteLength` bytes into `p`. It resolves to the number of
     * bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
     * encountered. Even if `read()` resolves to `n` < `p.byteLength`, it may
     * use all of `p` as scratch space during the call. If some data is
     * available but not `p.byteLength` bytes, `read()` conventionally resolves
     * to what is available instead of waiting for more.
     *
     * When `read()` encounters end-of-file condition, it resolves to EOF
     * (`null`).
     *
     * When `read()` encounters an error, it rejects with an error.
     *
     * Callers should always process the `n` > `0` bytes returned before
     * considering the EOF (`null`). Doing so correctly handles I/O errors that
     * happen after reading some bytes and also both of the allowed EOF
     * behaviors.
     *
     * Implementations should not retain a reference to `p`.
     *
     * Use
     * [`itereateReader`](https://deno.land/std/streams/iterate_reader.ts?s=iterateReader)
     * from
     * [`std/streams/iterate_reader.ts`](https://deno.land/std/streams/iterate_reader.ts)
     * to turn a `Reader` into an {@linkcode AsyncIterator}.
     */
    read(p: Uint8Array): Promise<number | null>;
  }

  /**
   * An abstract interface which when implemented provides an interface to read
   * bytes into an array buffer synchronously.
   *
   * @category I/O
   */
  export interface ReaderSync {
    /**
     * Reads up to `p.byteLength` bytes into `p`. It resolves to the number
     * of bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
     * encountered. Even if `readSync()` returns `n` < `p.byteLength`, it may use
     * all of `p` as scratch space during the call. If some data is available
     * but not `p.byteLength` bytes, `readSync()` conventionally returns what is
     * available instead of waiting for more.
     *
     * When `readSync()` encounters end-of-file condition, it returns EOF
     * (`null`).
     *
     * When `readSync()` encounters an error, it throws with an error.
     *
     * Callers should always process the `n` > `0` bytes returned before
     * considering the EOF (`null`). Doing so correctly handles I/O errors that
     * happen after reading some bytes and also both of the allowed EOF
     * behaviors.
     *
     * Implementations should not retain a reference to `p`.
     *
     * Use
     * [`itereateReaderSync`](https://deno.land/std/streams/iterate_reader.ts?s=iterateReaderSync)
     * from from
     * [`std/streams/iterate_reader.ts`](https://deno.land/std/streams/iterate_reader.ts)
     * to turn a `ReaderSync` into an {@linkcode Iterator}.
     */
    readSync(p: Uint8Array): number | null;
  }

  /**
   * Options which can be set when using {@linkcode Deno.readFile} or
   * {@linkcode Deno.readFileSync}.
   *
   * @category File System
   */
  export interface ReadFileOptions {
    /**
     * An abort signal to allow cancellation of the file read operation.
     * If the signal becomes aborted the readFile operation will be stopped
     * and the promise returned will be rejected with an AbortError.
     */
    signal?: AbortSignal;
  }

  /**
   * The permission descriptor for the `allow-read` permissions, which controls
   * access to reading resources from the local host. The option `path` allows
   * scoping the permission to a specific path (and if the path is a directory
   * any sub paths).
   *
   * Permission granted under `allow-read` only allows runtime code to attempt
   * to read, the underlying operating system may apply additional permissions.
   *
   * @category Permissions
   */
  export interface ReadPermissionDescriptor {
    name: "read";
    /**
     * The `allow-read` permission can be scoped to a specific path (and if
     * the path is a directory, any sub paths).
     */
    path?: string | URL;
  }

  /**
   * Options which can be set when using {@linkcode Deno.remove} and
   * {@linkcode Deno.removeSync}.
   *
   * @category File System
   */
  export interface RemoveOptions {
    /**
     * If set to `true`, path will be removed even if it's a non-empty directory.
     *
     * @default {false}
     */
    recursive?: boolean;
  }

  /**
   * A map of open resources that Deno is tracking. The key is the resource ID
   * (_rid_) and the value is its representation.
   *
   * @category Observability
   */
  export interface ResourceMap {
    [rid: number]: unknown;
  }

  /**
   * @deprecated Use {@linkcode Deno.Command} instead.
   *
   * Options which can be used with {@linkcode Deno.run}.
   * @category Sub Process
   */
  export interface RunOptions {
    /**
     * Arguments to pass.
     *
     * _Note_: the first element needs to be a path to the executable that is
     * being run.
     */
    cmd: readonly string[] | [string | URL, ...string[]];
    /**
     * The current working directory that should be used when running the
     * sub-process.
     */
    cwd?: string;
    /** Any environment variables to be set when running the sub-process. */
    env?: Record<string, string>;
    /**
     * By default subprocess inherits `stdout` of parent process. To change
     * this this option can be set to a resource ID (_rid_) of an open file,
     * `"inherit"`, `"piped"`, or `"null"`:
     *
     * - _number_: the resource ID of an open file/resource. This allows you to
     *   write to a file.
     * - `"inherit"`: The default if unspecified. The subprocess inherits from the
     *   parent.
     * - `"piped"`: A new pipe should be arranged to connect the parent and child
     *   sub-process.
     * - `"null"`: This stream will be ignored. This is the equivalent of attaching
     *   the stream to `/dev/null`.
     */
    stdout?: "inherit" | "piped" | "null" | number;
    /**
     * By default subprocess inherits `stderr` of parent process. To change
     * this this option can be set to a resource ID (_rid_) of an open file,
     * `"inherit"`, `"piped"`, or `"null"`:
     *
     * - _number_: the resource ID of an open file/resource. This allows you to
     *   write to a file.
     * - `"inherit"`: The default if unspecified. The subprocess inherits from the
     *   parent.
     * - `"piped"`: A new pipe should be arranged to connect the parent and child
     *   sub-process.
     * - `"null"`: This stream will be ignored. This is the equivalent of attaching
     *   the stream to `/dev/null`.
     */
    stderr?: "inherit" | "piped" | "null" | number;
    /**
     * By default subprocess inherits `stdin` of parent process. To change
     * this this option can be set to a resource ID (_rid_) of an open file,
     * `"inherit"`, `"piped"`, or `"null"`:
     *
     * - _number_: the resource ID of an open file/resource. This allows you to
     *   read from a file.
     * - `"inherit"`: The default if unspecified. The subprocess inherits from the
     *   parent.
     * - `"piped"`: A new pipe should be arranged to connect the parent and child
     *   sub-process.
     * - `"null"`: This stream will be ignored. This is the equivalent of attaching
     *   the stream to `/dev/null`.
     */
    stdin?: "inherit" | "piped" | "null" | number;
  }

  /**
   * The permission descriptor for the `allow-run` permission, which controls
   * access to what sub-processes can be executed by Deno. The option `command`
   * allows scoping the permission to a specific executable.
   *
   * **Warning, in practice, `allow-run` is effectively the same as `allow-all`
   * in the sense that malicious code could execute any arbitrary code on the
   * host.**
   *
   * @category Permissions
   */
  export interface RunPermissionDescriptor {
    name: "run";
    /**
     * The `allow-run` permission can be scoped to a specific executable,
     * which would be relative to the start-up CWD of the Deno CLI.
     */
    command?: string | URL;
  }

  /**
   * An abstract interface which when implemented provides an interface to seek
   * within an open file/resource asynchronously.
   *
   * @category I/O
   */
  export interface Seeker {
    /**
     * Seek sets the offset for the next `read()` or `write()` to offset,
     * interpreted according to `whence`: `Start` means relative to the
     * start of the file, `Current` means relative to the current offset,
     * and `End` means relative to the end. Seek resolves to the new offset
     * relative to the start of the file.
     *
     * Seeking to an offset before the start of the file is an error. Seeking to
     * any positive offset is legal, but the behavior of subsequent I/O
     * operations on the underlying object is implementation-dependent.
     *
     * It resolves with the updated offset.
     */
    seek(offset: number | bigint, whence: SeekMode): Promise<number>;
  }

  /**
   * An abstract interface which when implemented provides an interface to seek
   * within an open file/resource synchronously.
   *
   * @category I/O
   */
  export interface SeekerSync {
    /**
     * Seek sets the offset for the next `readSync()` or `writeSync()` to
     * offset, interpreted according to `whence`: `Start` means relative
     * to the start of the file, `Current` means relative to the current
     * offset, and `End` means relative to the end.
     *
     * Seeking to an offset before the start of the file is an error. Seeking to
     * any positive offset is legal, but the behavior of subsequent I/O
     * operations on the underlying object is implementation-dependent.
     *
     * It returns the updated offset.
     */
    seekSync(offset: number, whence: SeekMode): number;
  }

  /** @category I/O */
  export interface SetRawOptions {
    /**
     * The `cbreak` option can be used to indicate that characters that
     * correspond to a signal should still be generated. When disabling raw
     * mode, this option is ignored. This functionality currently only works on
     * Linux and Mac OS.
     */
    cbreak: boolean;
  }

  /**
   * Operating signals which can be listened for or sent to sub-processes. What
   * signals and what their standard behaviors are OS dependent.
   *
   * @category Runtime Environment
   */
  export type Signal = | "SIGABRT"
        | "SIGALRM"
        | "SIGBREAK"
        | "SIGBUS"
        | "SIGCHLD"
        | "SIGCONT"
        | "SIGEMT"
        | "SIGFPE"
        | "SIGHUP"
        | "SIGILL"
        | "SIGINFO"
        | "SIGINT"
        | "SIGIO"
        | "SIGKILL"
        | "SIGPIPE"
        | "SIGPROF"
        | "SIGPWR"
        | "SIGQUIT"
        | "SIGSEGV"
        | "SIGSTKFLT"
        | "SIGSTOP"
        | "SIGSYS"
        | "SIGTERM"
        | "SIGTRAP"
        | "SIGTSTP"
        | "SIGTTIN"
        | "SIGTTOU"
        | "SIGURG"
        | "SIGUSR1"
        | "SIGUSR2"
        | "SIGVTALRM"
        | "SIGWINCH"
        | "SIGXCPU"
        | "SIGXFSZ";

  /**
   * Options that can be used with {@linkcode symlink} and
   * {@linkcode symlinkSync}.
   *
   * @category File System
   */
  export interface SymlinkOptions {
    /**
     * If the symbolic link should be either a file or directory. This option
     * only applies to Windows and is ignored on other operating systems.
     */
    type: "file" | "dir";
  }

  /** @category Testing */
  export interface TestDefinition {
    fn: (t: TestContext) => void | Promise<void>;
    /** The name of the test. */
    name: string;
    /**
     * If truthy the current test step will be ignored.
     *
     * It is a quick way to skip over a step, but also can be used for
     * conditional logic, like determining if an environment feature is present.
     */
    ignore?: boolean;
    /**
     * If at least one test has `only` set to `true`, only run tests that have
     * `only` set to `true` and fail the test suite.
     */
    only?: boolean;
    /**
     * Check that the number of async completed operations after the test step
     * is the same as number of dispatched operations. This ensures that the
     * code tested does not start async operations which it then does
     * not await. This helps in preventing logic errors and memory leaks
     * in the application code.
     *
     * @default {true}
     */
    sanitizeOps?: boolean;
    /**
     * Ensure the test step does not "leak" resources - like open files or
     * network connections - by ensuring the open resources at the start of the
     * test match the open resources at the end of the test.
     *
     * @default {true}
     */
    sanitizeResources?: boolean;
    /**
     * Ensure the test case does not prematurely cause the process to exit,
     * for example via a call to {@linkcode Deno.exit}.
     *
     * @default {true}
     */
    sanitizeExit?: boolean;
    /**
     * Specifies the permissions that should be used to run the test.
     *
     * Set this to "inherit" to keep the calling runtime permissions, set this
     * to "none" to revoke all permissions, or set a more specific set of
     * permissions using a {@linkcode PermissionOptionsObject}.
     *
     * @default {"inherit"}
     */
    permissions?: PermissionOptions;
  }

  /** @category Testing */
  export interface TestStepDefinition {
    /**
     * The test function that will be tested when this step is executed. The
     * function can take an argument which will provide information about the
     * current step's context.
     */
    fn: (t: TestContext) => void | Promise<void>;
    /** The name of the step. */
    name: string;
    /**
     * If truthy the current test step will be ignored.
     *
     * This is a quick way to skip over a step, but also can be used for
     * conditional logic, like determining if an environment feature is present.
     */
    ignore?: boolean;
    /**
     * Check that the number of async completed operations after the test step
     * is the same as number of dispatched operations. This ensures that the
     * code tested does not start async operations which it then does
     * not await. This helps in preventing logic errors and memory leaks
     * in the application code.
     *
     * Defaults to the parent test or step's value.
     */
    sanitizeOps?: boolean;
    /**
     * Ensure the test step does not "leak" resources - like open files or
     * network connections - by ensuring the open resources at the start of the
     * step match the open resources at the end of the step.
     *
     * Defaults to the parent test or step's value.
     */
    sanitizeResources?: boolean;
    /**
     * Ensure the test step does not prematurely cause the process to exit,
     * for example via a call to {@linkcode Deno.exit}.
     *
     * Defaults to the parent test or step's value.
     */
    sanitizeExit?: boolean;
  }

  /**
   * Context that is passed to a testing function, which can be used to either
   * gain information about the current test, or register additional test
   * steps within the current test.
   *
   * @category Testing
   */
  export interface TestContext {
    /** The current test name. */
    name: string;
    /** The string URL of the current test. */
    origin: string;
    /**
     * If the current test is a step of another test, the parent test context
     * will be set here.
     */
    parent?: TestContext;
    /**
     * Run a sub step of the parent test or step. Returns a promise
     * that resolves to a boolean signifying if the step completed successfully.
     *
     * The returned promise never rejects unless the arguments are invalid.
     *
     * If the test was ignored the promise returns `false`.
     *
     * ```ts
     * Deno.test({
     *   name: "a parent test",
     *   async fn(t) {
     *     console.log("before the step");
     *     await t.step({
     *       name: "step 1",
     *       fn(t) {
     *         console.log("current step:", t.name);
     *       }
     *     });
     *     console.log("after the step");
     *   }
     * });
     * ```
     */
    step(definition: TestStepDefinition): Promise<boolean>;
    /**
     * Run a sub step of the parent test or step. Returns a promise
     * that resolves to a boolean signifying if the step completed successfully.
     *
     * The returned promise never rejects unless the arguments are invalid.
     *
     * If the test was ignored the promise returns `false`.
     *
     * ```ts
     * Deno.test(
     *   "a parent test",
     *   async (t) => {
     *     console.log("before the step");
     *     await t.step(
     *       "step 1",
     *       (t) => {
     *         console.log("current step:", t.name);
     *       }
     *     );
     *     console.log("after the step");
     *   }
     * );
     * ```
     */
    step(name: string, fn: (t: TestContext) => void | Promise<void>): Promise<boolean>;
    /**
     * Run a sub step of the parent test or step. Returns a promise
     * that resolves to a boolean signifying if the step completed successfully.
     *
     * The returned promise never rejects unless the arguments are invalid.
     *
     * If the test was ignored the promise returns `false`.
     *
     * ```ts
     * Deno.test(async function aParentTest(t) {
     *   console.log("before the step");
     *   await t.step(function step1(t) {
     *     console.log("current step:", t.name);
     *   });
     *   console.log("after the step");
     * });
     * ```
     */
    step(fn: (t: TestContext) => void | Promise<void>): Promise<boolean>;
  }

  /** @category Network */
  export interface TcpConn extends Conn {
    /**
     * Enable/disable the use of Nagle's algorithm.
     *
     * @param [noDelay=true]
     */
    setNoDelay(noDelay?: boolean): void;
    /** Enable/disable keep-alive functionality. */
    setKeepAlive(keepAlive?: boolean): void;
  }

  /** @category Network */
  export interface TcpListenOptions extends ListenOptions {
  }

  /** @category Network */
  export interface TcpListenOptions extends ListenOptions {
    /**
     * When `true` the SO_REUSEPORT flag will be set on the listener. This
     * allows multiple processes to listen on the same address and port.
     *
     * On Linux this will cause the kernel to distribute incoming connections
     * across the different processes that are listening on the same address and
     * port.
     *
     * This flag is only supported on Linux. It is silently ignored on other
     * platforms.
     *
     * @default {false}
     */
    reusePort?: boolean;
  }

  /** @category Network */
  export interface TlsConn extends Conn {
    /**
     * Runs the client or server handshake protocol to completion if that has
     * not happened yet. Calling this method is optional; the TLS handshake
     * will be completed automatically as soon as data is sent or received.
     */
    handshake(): Promise<TlsHandshakeInfo>;
  }

  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * @category Network
   */
  export interface TlsConn extends Conn {
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * Runs the client or server handshake protocol to completion if that has
     * not happened yet. Calling this method is optional; the TLS handshake
     * will be completed automatically as soon as data is sent or received.
     */
    handshake(): Promise<TlsHandshakeInfo>;
  }

  /**
   * Specialized listener that accepts TLS connections.
   *
   * @category Network
   */
  export interface TlsListener extends Listener, AsyncIterable<TlsConn> {
    /** Waits for a TLS client to connect and accepts the connection. */
    accept(): Promise<TlsConn>;
    [Symbol.asyncIterator](): AsyncIterableIterator<TlsConn>;
  }

  /** @category Network */
  export interface UnixAddr {
    transport: "unix" | "unixpacket";
    path: string;
  }

  /** @category Network */
  export interface UnixConn extends Conn {
  }

  /**
   * Options for writing to a file.
   *
   * @category File System
   */
  export interface WriteFileOptions {
    /**
     * If set to `true`, will append to a file instead of overwriting previous
     * contents.
     *
     * @default {false}
     */
    append?: boolean;
    /**
     * Sets the option to allow creating a new file, if one doesn't already
     * exist at the specified path.
     *
     * @default {true}
     */
    create?: boolean;
    /**
     * If set to `true`, no file, directory, or symlink is allowed to exist at
     * the target location. When createNew is set to `true`, `create` is ignored.
     *
     * @default {false}
     */
    createNew?: boolean;
    /** Permissions always applied to file. */
    mode?: number;
    /**
     * An abort signal to allow cancellation of the file write operation.
     *
     * If the signal becomes aborted the write file operation will be stopped
     * and the promise returned will be rejected with an {@linkcode AbortError}.
     */
    signal?: AbortSignal;
  }

  /**
   * The permission descriptor for the `allow-write` permissions, which
   * controls access to writing to resources from the local host. The option
   * `path` allow scoping the permission to a specific path (and if the path is
   * a directory any sub paths).
   *
   * Permission granted under `allow-write` only allows runtime code to attempt
   * to write, the underlying operating system may apply additional permissions.
   *
   * @category Permissions
   */
  export interface WritePermissionDescriptor {
    name: "write";
    /**
     * The `allow-write` permission can be scoped to a specific path (and if
     * the path is a directory, any sub paths).
     */
    path?: string | URL;
  }

  /**
   * An abstract interface which when implemented provides an interface to write
   * bytes from an array buffer to a file/resource asynchronously.
   *
   * @category I/O
   */
  export interface Writer {
    /**
     * Writes `p.byteLength` bytes from `p` to the underlying data stream. It
     * resolves to the number of bytes written from `p` (`0` <= `n` <=
     * `p.byteLength`) or reject with the error encountered that caused the
     * write to stop early. `write()` must reject with a non-null error if
     * would resolve to `n` < `p.byteLength`. `write()` must not modify the
     * slice data, even temporarily.
     *
     * This function is one of the lowest
     * level APIs and most users should not work with this directly, but rather use
     * [`writeAll()`](https://deno.land/std/streams/write_all.ts?s=writeAll) from
     * [`std/streams/write_all.ts`](https://deno.land/std/streams/write_all.ts)
     * instead.
     *
     * Implementations should not retain a reference to `p`.
     */
    write(p: Uint8Array): Promise<number>;
  }

  /**
   * An abstract interface which when implemented provides an interface to write
   * bytes from an array buffer to a file/resource synchronously.
   *
   * @category I/O
   */
  export interface WriterSync {
    /**
     * Writes `p.byteLength` bytes from `p` to the underlying data
     * stream. It returns the number of bytes written from `p` (`0` <= `n`
     * <= `p.byteLength`) and any error encountered that caused the write to
     * stop early. `writeSync()` must throw a non-null error if it returns `n` <
     * `p.byteLength`. `writeSync()` must not modify the slice data, even
     * temporarily.
     *
     * Implementations should not retain a reference to `p`.
     */
    writeSync(p: Uint8Array): number;
  }

  /**
   * If {@linkcode Deno.resolveDns} is called with `"CAA"` record type
   * specified, it will resolve with an array of objects with this interface.
   *
   * @category Network
   */
  export interface CAARecord {
    /**
     * If `true`, indicates that the corresponding property tag **must** be
     * understood if the semantics of the CAA record are to be correctly
     * interpreted by an issuer.
     *
     * Issuers **must not** issue certificates for a domain if the relevant CAA
     * Resource Record set contains unknown property tags that have `critical`
     * set.
     */
    critical: boolean;
    /**
     * An string that represents the identifier of the property represented by
     * the record.
     */
    tag: string;
    /** The value associated with the tag. */
    value: string;
  }

  /**
   * If {@linkcode Deno.resolveDns} is called with `"MX"` record type
   * specified, it will return an array of objects with this interface.
   *
   * @category Network
   */
  export interface MXRecord {
    /**
     * A priority value, which is a relative value compared to the other
     * preferences of MX records for the domain.
     */
    preference: number;
    /** The server that mail should be delivered to. */
    exchange: string;
  }

  /**
   * If {@linkcode Deno.resolveDns} is called with `"NAPTR"` record type
   * specified, it will return an array of objects with this interface.
   *
   * @category Network
   */
  export interface NAPTRRecord {
    order: number;
    preference: number;
    flags: string;
    services: string;
    regexp: string;
    replacement: string;
  }

  /**
   * Options which can be set when using {@linkcode Deno.resolveDns}.
   *
   * @category Network
   */
  export interface ResolveDnsOptions {
    /**
     * The name server to be used for lookups.
     *
     * If not specified, defaults to the system configuration. For example
     * `/etc/resolv.conf` on Unix-like systems.
     */
    nameServer?: {
        /** The IP address of the name server. */
        ipAddr: string;
        /** The port number the query will be sent to.
         *
         * @default {53} */
        port?: number;
      };
    /**
     * An abort signal to allow cancellation of the DNS resolution operation.
     * If the signal becomes aborted the resolveDns operation will be stopped
     * and the promise returned will be rejected with an AbortError.
     */
    signal?: AbortSignal;
  }

  /**
   * If {@linkcode Deno.resolveDns} is called with `"SOA"` record type
   * specified, it will return an array of objects with this interface.
   *
   * @category Network
   */
  export interface SOARecord {
    mname: string;
    rname: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minimum: number;
  }

  /**
   * If {@linkcode Deno.resolveDns} is called with `"SRV"` record type
   * specified, it will return an array of objects with this interface.
   *
   * @category Network
   */
  export interface SRVRecord {
    priority: number;
    weight: number;
    port: number;
    target: string;
  }

  /**
   * The type of the resource record to resolve via DNS using
   * {@linkcode Deno.resolveDns}.
   *
   * Only the listed types are supported currently.
   *
   * @category Network
   */
  export type RecordType = | "A"
        | "AAAA"
        | "ANAME"
        | "CAA"
        | "CNAME"
        | "MX"
        | "NAPTR"
        | "NS"
        | "PTR"
        | "SOA"
        | "SRV"
        | "TXT";
  /**
   * Information related to the build of the current Deno runtime.
   *
   * Users are discouraged from code branching based on this information, as
   * assumptions about what is available in what build environment might change
   * over time. Developers should specifically sniff out the features they
   * intend to use.
   *
   * The intended use for the information is for logging and debugging purposes.
   *
   * @category Runtime Environment
   */
  export const build: {
    /** The [LLVM](https://llvm.org/) target triple, which is the combination
     * of `${arch}-${vendor}-${os}` and represent the specific build target that
     * the current runtime was built for. */
    target: string;
    /** Instruction set architecture that the Deno CLI was built for. */
    arch: "x86_64" | "aarch64";
    /** The operating system that the Deno CLI was built for. `"darwin"` is
     * also known as OSX or MacOS. */
    os:
      | "darwin"
      | "linux"
      | "windows"
      | "freebsd"
      | "netbsd"
      | "aix"
      | "solaris"
      | "illumos";
    /** The computer vendor that the Deno CLI was built for. */
    vendor: string;
    /** Optional environment flags that were set for this build of Deno CLI. */
    env?: string;
    };
  export const customInspect: unique symbol;
  /**
   * An interface containing methods to interact with the process environment
   * variables.
   *
   * @tags allow-env
   * @category Runtime Environment
   */
  export const env: Env;

  export namespace errors {
    export class AddrInUse extends Error {
    }

    export class AddrNotAvailable extends Error {
    }

    export class AlreadyExists extends Error {
    }

    export class BadResource extends Error {
    }

    export class BrokenPipe extends Error {
    }

    export class Busy extends Error {
    }

    export class ConnectionAborted extends Error {
    }

    export class ConnectionRefused extends Error {
    }

    export class ConnectionReset extends Error {
    }

    export class Http extends Error {
    }

    export class Interrupted extends Error {
    }

    export class InvalidData extends Error {
    }

    export class NotConnected extends Error {
    }

    export class NotFound extends Error {
      code: string;
    }

    export class PermissionDenied extends Error {
    }

    export class TimedOut extends Error {
    }

    export class UnexpectedEof extends Error {
    }

    export class WriteZero extends Error {
    }
  }

  /**
   * The URL of the entrypoint module entered from the command-line. It
   * requires read permission to the CWD.
   *
   * Also see {@linkcode ImportMeta} for other related information.
   *
   * @tags allow-read
   * @category Runtime Environment
   */
  export const mainModule: string;
  /**
   * Receive metrics from the privileged side of Deno. This is primarily used
   * in the development of Deno. _Ops_, also called _bindings_, are the
   * go-between between Deno JavaScript sandbox and the rest of Deno.
   *
   * ```shell
   * > console.table(Deno.metrics())
   * ┌─────────────────────────┬────────┐
   * │         (index)         │ Values │
   * ├─────────────────────────┼────────┤
   * │      opsDispatched      │   3    │
   * │    opsDispatchedSync    │   2    │
   * │   opsDispatchedAsync    │   1    │
   * │ opsDispatchedAsyncUnref │   0    │
   * │      opsCompleted       │   3    │
   * │    opsCompletedSync     │   2    │
   * │    opsCompletedAsync    │   1    │
   * │ opsCompletedAsyncUnref  │   0    │
   * │    bytesSentControl     │   73   │
   * │      bytesSentData      │   0    │
   * │      bytesReceived      │  375   │
   * └─────────────────────────┴────────┘
   * ```
   *
   * @category Observability
   */
  export function metrics(): Metrics;
  /**
   * Reflects the `NO_COLOR` environment variable at program start.
   *
   * When the value is `true`, the Deno CLI will attempt to not send color codes
   * to `stderr` or `stdout` and other command line programs should also attempt
   * to respect this value.
   *
   * See: https://no-color.org/
   *
   * @category Runtime Environment
   */
  export const noColor: boolean;
  /**
   * Deno's permission management API.
   *
   * It is a singleton instance of the {@linkcode Permissions} object and is
   * based on the web platform
   * [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API),
   * though some proposed parts of the API which are useful in a server side
   * runtime context were removed or abandoned in the web platform specification
   * which is why it was chosen to locate it in the {@linkcode Deno} namespace
   * instead.
   *
   * By default, if the `stdin`/`stdout` is TTY for the Deno CLI (meaning it can
   * send and receive text), then the CLI will prompt the user to grant
   * permission when an un-granted permission is requested. This behavior can
   * be changed by using the `--no-prompt` command at startup. When prompting
   * the CLI will request the narrowest permission possible, potentially making
   * it annoying to the user. The permissions APIs allow the code author to
   * request a wider set of permissions at one time in order to provide a better
   * user experience.
   *
   * Requesting already granted permissions will not prompt the user and will
   * return that the permission was granted.
   *
   * ### Querying
   *
   * ```ts
   * const status = await Deno.permissions.query({ name: "read", path: "/etc" });
   * console.log(status.state);
   * ```
   *
   * ```ts
   * const status = Deno.permissions.querySync({ name: "read", path: "/etc" });
   * console.log(status.state);
   * ```
   *
   * ### Revoking
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   *
   * const status = await Deno.permissions.revoke({ name: "run" });
   * assert(status.state !== "granted")
   * ```
   *
   * ```ts
   * import { assert } from "https://deno.land/std/testing/asserts.ts";
   *
   * const status = Deno.permissions.revokeSync({ name: "run" });
   * assert(status.state !== "granted")
   * ```
   *
   * ### Requesting
   *
   * ```ts
   * const status = await Deno.permissions.request({ name: "env" });
   * if (status.state === "granted") {
   *   console.log("'env' permission is granted.");
   * } else {
   *   console.log("'env' permission is denied.");
   * }
   * ```
   *
   * ```ts
   * const status = Deno.permissions.requestSync({ name: "env" });
   * if (status.state === "granted") {
   *   console.log("'env' permission is granted.");
   * } else {
   *   console.log("'env' permission is denied.");
   * }
   * ```
   *
   * @category Permissions
   */
  export const permissions: Permissions;
  /**
   * The current process ID of this instance of the Deno CLI.
   *
   * ```ts
   * console.log(Deno.pid);
   * ```
   *
   * @category Runtime Environment
   */
  export const pid: number;
  /**
   * The process ID of parent process of this instance of the Deno CLI.
   *
   * ```ts
   * console.log(Deno.ppid);
   * ```
   *
   * @category Runtime Environment
   */
  export const ppid: number;
  /**
   * Returns a map of open resource IDs (_rid_) along with their string
   * representations. This is an internal API and as such resource
   * representation has `unknown` type; that means it can change any time and
   * should not be depended upon.
   *
   * ```ts
   * console.log(Deno.resources());
   * // { 0: "stdin", 1: "stdout", 2: "stderr" }
   * Deno.openSync('../test.file');
   * console.log(Deno.resources());
   * // { 0: "stdin", 1: "stdout", 2: "stderr", 3: "fsFile" }
   * ```
   *
   * @category Observability
   */
  export function resources(): ResourceMap;
  /**
   * Version information related to the current Deno CLI runtime environment.
   *
   * Users are discouraged from code branching based on this information, as
   * assumptions about what is available in what build environment might change
   * over time. Developers should specifically sniff out the features they
   * intend to use.
   *
   * The intended use for the information is for logging and debugging purposes.
   *
   * @category Runtime Environment
   */
  export const version: {
    /** Deno CLI's version. For example: `"1.26.0"`. */
    deno: string;
    /** The V8 version used by Deno. For example: `"10.7.100.0"`.
     *
     * V8 is the underlying JavaScript runtime platform that Deno is built on
     * top of. */
    v8: string;
    /** The TypeScript version used by Deno. For example: `"4.8.3"`.
     *
     * A version of the TypeScript type checker and language server is built-in
     * to the Deno CLI. */
    typescript: string;
    };
  /**
   * A reference to `stdin` which can be used to read directly from `stdin`.
   * It implements the Deno specific {@linkcode Reader}, {@linkcode ReaderSync},
   * and {@linkcode Closer} interfaces as well as provides a
   * {@linkcode ReadableStream} interface.
   *
   * ### Reading chunks from the readable stream
   *
   * ```ts
   * const decoder = new TextDecoder();
   * for await (const chunk of Deno.stdin.readable) {
   *   const text = decoder.decode(chunk);
   *   // do something with the text
   * }
   * ```
   *
   * @category I/O
   */
  export const stdin: Reader & ReaderSync & Closer & {
    /** The resource ID assigned to `stdin`. This can be used with the discreet
     * I/O functions in the `Deno` namespace. */
    readonly rid: number;
    /** A readable stream interface to `stdin`. */
    readonly readable: ReadableStream<Uint8Array>;
    /**
     * Set TTY to be under raw mode or not. In raw mode, characters are read and
     * returned as is, without being processed. All special processing of
     * characters by the terminal is disabled, including echoing input
     * characters. Reading from a TTY device in raw mode is faster than reading
     * from a TTY device in canonical mode.
     *
     * ```ts
     * Deno.stdin.setRaw(true, { cbreak: true });
     * ```
     *
     * @category I/O
     */
    setRaw(mode: boolean, options?: SetRawOptions): void;
    };
  /**
   * A reference to `stdout` which can be used to write directly to `stdout`.
   * It implements the Deno specific {@linkcode Writer}, {@linkcode WriterSync},
   * and {@linkcode Closer} interfaces as well as provides a
   * {@linkcode WritableStream} interface.
   *
   * These are low level constructs, and the {@linkcode console} interface is a
   * more straight forward way to interact with `stdout` and `stderr`.
   *
   * @category I/O
   */
  export const stdout: Writer & WriterSync & Closer & {
    /** The resource ID assigned to `stdout`. This can be used with the discreet
     * I/O functions in the `Deno` namespace. */
    readonly rid: number;
    /** A writable stream interface to `stdout`. */
    readonly writable: WritableStream<Uint8Array>;
    };
  /**
   * A reference to `stderr` which can be used to write directly to `stderr`.
   * It implements the Deno specific {@linkcode Writer}, {@linkcode WriterSync},
   * and {@linkcode Closer} interfaces as well as provides a
   * {@linkcode WritableStream} interface.
   *
   * These are low level constructs, and the {@linkcode console} interface is a
   * more straight forward way to interact with `stdout` and `stderr`.
   *
   * @category I/O
   */
  export const stderr: Writer & WriterSync & Closer & {
    /** The resource ID assigned to `stderr`. This can be used with the discreet
     * I/O functions in the `Deno` namespace. */
    readonly rid: number;
    /** A writable stream interface to `stderr`. */
    readonly writable: WritableStream<Uint8Array>;
    };

  /** @category Network */
  export interface TlsHandshakeInfo {
  }

  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * @category Network
   */
  export interface TlsHandshakeInfo {
    /**
     * *UNSTABLE**: New API, yet to be vetted.
     *
     * Contains the ALPN protocol selected during negotiation with the server.
     * If no ALPN protocol selected, returns `null`.
     */
    alpnProtocol: string | null;
  }

  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * @category Network
   */
  export interface UnixConnectOptions {
    transport: "unix";
    path: string;
  }

  /**
   * *UNSTABLE**: New API, yet to be vetted.
   *
   * Unstable options which can be set when opening a Unix listener via
   * {@linkcode Deno.listen} or {@linkcode Deno.listenDatagram}.
   *
   * @category Network
   */
  export interface UnixListenOptions {
    /** A path to the Unix Socket. */
    path: string;
  }

  /**
   * Changes the access (`atime`) and modification (`mtime`) times of a file
   * stream resource referenced by `rid`. Given times are either in seconds
   * (UNIX epoch time) or as `Date` objects.
   *
   * ```ts
   * const file = await Deno.open("file.txt", { create: true, write: true });
   * await Deno.futime(file.rid, 1556495550, new Date());
   * ```
   *
   * @category File System
   */
  export function futime(rid: number, atime: number | Date, mtime: number | Date): Promise<void>;
  /**
   * Synchronously changes the access (`atime`) and modification (`mtime`) times
   * of a file stream resource referenced by `rid`. Given times are either in
   * seconds (UNIX epoch time) or as `Date` objects.
   *
   * ```ts
   * const file = Deno.openSync("file.txt", { create: true, write: true });
   * Deno.futimeSync(file.rid, 1556495550, new Date());
   * ```
   *
   * @category File System
   */
  export function futimeSync(rid: number, atime: number | Date, mtime: number | Date): void;
  /**
   * Changes the access (`atime`) and modification (`mtime`) times of a file
   * system object referenced by `path`. Given times are either in seconds
   * (UNIX epoch time) or as `Date` objects.
   *
   * ```ts
   * await Deno.utime("myfile.txt", 1556495550, new Date());
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function utime(path: string | URL, atime: number | Date, mtime: number | Date): Promise<void>;
  /**
   * Synchronously changes the access (`atime`) and modification (`mtime`) times
   * of a file system object referenced by `path`. Given times are either in
   * seconds (UNIX epoch time) or as `Date` objects.
   *
   * ```ts
   * Deno.utimeSync("myfile.txt", 1556495550, new Date());
   * ```
   *
   * Requires `allow-write` permission.
   *
   * @tags allow-write
   * @category File System
   */
  export function utimeSync(path: string | URL, atime: number | Date, mtime: number | Date): void;
}

declare module "@deno/shim-deno/test-internals" {
  type TestDefinition = Deno.TestDefinition;
  /** Reference to the array that `Deno.test` calls insert their definition into. */
  export const testDefinitions: TestDefinition[];
}
